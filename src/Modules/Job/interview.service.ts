import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobApplicant } from "./job_applicant.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { Interview } from "./interviews.entity";
import {
  InterviewNextStep,
  InterviewStatus,
} from "src/Shared/Enums/Interview.enum";
import { completeInterviewDTO } from "./dto/completeInterview.dto";
import { FeedBack } from "./feedback.entity";
import { rescheduleDTO } from "./dto/reschedule.dto";
import { cancelInterviewDTO } from "./dto/cancelInterview.dto";
import { CancelInterview } from "./cancelInterview.entity";
import { CancelBy } from "src/Shared/Enums/interviewCancel.enum";
import { CandidateStatus } from "src/Shared/Enums/candidateStatus.enum";
import { Reject } from "./reject.entity";
import { JobServices } from "./job.service";

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(JobApplicant)
    private jobApplicantRepository: Repository<JobApplicant>,
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
    @InjectRepository(FeedBack)
    private feedbackRepository: Repository<FeedBack>,
    @InjectRepository(CancelInterview)
    private cancelInterviewRepository: Repository<CancelInterview>,
    @InjectRepository(Reject) private rejectRepository: Repository<Reject>,
    private jobService: JobServices,
  ) {}

  public async getAllInterviewWithCompany(companyId: string) {
    const interviews = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("application.applicant", "applicant")
      .leftJoinAndSelect("interview.feedback", "feedback")
      .leftJoinAndSelect("interview.CancelInterview", "cancel")

      .where("company.id = :companyId", { companyId })

      .select([
        "interview",

        "application",
        "applicant.id",
        "applicant.name",

        "job.id",
        "job.title",

        "feedback",

        "cancel",
      ])

      .getMany();

    if (!interviews) throw new BadRequestException("there is no job interview");
    return {
      data: {
        type: interviews,
      },
    };
  }

  public async completeInterview(
    interviewId: string,
    companyId: string,
    dto: completeInterviewDTO,
  ) {
    const interview = await this.interviewRepository.findOne({
      where: {
        id: interviewId,
        application: { job: { company: { id: companyId } } },
      },
      relations: {
        application: true,
      },
    });
    if (!interview) throw new BadRequestException("there is no interview");

    if (interview.status === InterviewStatus.COMPLETED)
      throw new BadRequestException("this interview is already complete");

    if (interview.status === InterviewStatus.CANCELLED) {
      throw new BadRequestException("this interview is cancel");
    }

    const now = new Date().getTime();

    const endTime =
      new Date(interview.scheduledAt).getTime() + interview.durationMin * 60000;
console.log("scheduledAt:", interview.scheduledAt);
console.log("endTime:", new Date(endTime));
console.log("now:", new Date());
    if (now < endTime) {
      throw new BadRequestException("Interview is not finished yet");
    }

    const { publicFeedback, rating, nextStep, offer, nextInterview, reject } =
      dto;

    interview.status = InterviewStatus.COMPLETED;
    await this.interviewRepository.save(interview);

    const feedback = this.feedbackRepository.create({
      publicFeedback,
      rating,
      nextStep,
      interview,
    });

    switch (nextStep) {
      case InterviewNextStep.ANOTHERINTERVIEW: {
        if (!nextInterview)
          throw new BadRequestException("next interview data required");

        const { data } = await this.jobService.interviewCV(
          companyId,
          interview.application.id,
          nextInterview,
        );

        feedback.resultId = data.interviewId;
        break;
      }

      case InterviewNextStep.OFFERED: {
        if (!offer) throw new BadRequestException("offer data required");

        const { data } = await this.jobService.jobOffer(
          companyId,
          interview.application.id,
          offer,
        );

        feedback.resultId = data.offerId;
        break;
      }
      case InterviewNextStep.REJECTED: {
        if (!reject) throw new BadRequestException("reject data required");

        const { data } = await this.jobService.rejectCV(
          companyId,
          interview.application.id,
          reject,
        );
        feedback.resultId = data.rejectId;
        break;
      }
    }

    await this.feedbackRepository.save(feedback);

    return {
      data: {
        feedback,
      },
    };
  }

  public async rescheduleInterview(
    interviewId: string,
    dto: rescheduleDTO,
    companyId: string,
  ) {
    const interview = await this.interviewRepository.findOne({
      where: {
        id: interviewId,
        application: { job: { company: { id: companyId } } },
      },
    });
    if (!interview) throw new BadRequestException("there is no interview");

    if (
      !(
        interview.status === InterviewStatus.SCHEDULED ||
        interview.status === InterviewStatus.RESCHEDULED
      )
    ) {
      throw new BadRequestException(
        `can't rescheduled, the interview status is ${interview.status}`,
      );
    }

    const now = Date.now();
    const scheduledDate = new Date(dto.scheduledAt);
    
    if (scheduledDate.getTime() <= now) {
      throw new BadRequestException("the scheduled date must be in the future");
    }

    if (interview.scheduledAt.getTime() <= now) {
      throw new BadRequestException(
        "can't reschedule, interview already finished",
      );
    }

    if (interview.scheduledAt.getTime() === scheduledDate.getTime()) {
      throw new BadRequestException(
        "No changes detected in the scheduled interview time.",
      );
    }
    await this.checkInterviewConflict(
      companyId,
      scheduledDate,
      interview.durationMin,
    );

    interview.scheduledAt = scheduledDate;
    interview.meetingLink = dto.meetingLink;
    interview.status = InterviewStatus.RESCHEDULED;

    const Ninter = await this.interviewRepository.save(interview);

    return {
      data: {
        id: Ninter.id,
        status: Ninter.status,
        scheduledAt: Ninter.scheduledAt,
        meetingLink: Ninter.meetingLink,
      },
    };
  }

  public async cancelInterview(
    interviewId: string,
    dto: cancelInterviewDTO,
    cancelBy: CancelBy,
    companyId?: string,
    applicantId?: string,
  ) {
    if (cancelBy === CancelBy.COMPANY && !companyId) {
      throw new BadRequestException("companyId is required");
    }

    if (cancelBy === CancelBy.APPLICANT && !applicantId) {
      throw new BadRequestException("applicantId is required");
    }

    let where: FindOptionsWhere<Interview>;

    if (cancelBy === CancelBy.COMPANY) {
      where = {
        id: interviewId,
        application: {
          job: { company: { id: companyId } },
        },
      };
    } else {
      where = {
        id: interviewId,
        application: {
          applicant: { id: applicantId },
        },
      };
    }

    const interview = await this.interviewRepository.findOne({
      where,
      relations: ["application"],
    });
    if (!interview) throw new BadRequestException("there is no interview");

    if (interview.status === InterviewStatus.CANCELLED) {
      throw new BadRequestException(`this interview already cancel`);
    }
    interview.status = InterviewStatus.CANCELLED;
    interview.application.status = CandidateStatus.REJECTED;
    interview.application.rejectAt = new Date();
    await this.interviewRepository.save(interview);
    await this.jobApplicantRepository.save(interview.application);

    const cancel = this.cancelInterviewRepository.create({
      reason: dto.reason,
      cancelBy,
      interview,
    });
    const Ncancel = await this.cancelInterviewRepository.save(cancel);

    const reject = this.rejectRepository.create({
      reason: dto.reason,
      application: interview.application,
    });

    await this.rejectRepository.save(reject);

    return {
      data: {
        id: Ncancel.id,
        reason: Ncancel.reason,
        cancelBy: Ncancel.cancelBy,
        createdAt: Ncancel.createdAt,
      },
    };
  }

  public async getApplicantInterviews(applicantId: string) {
    const interviews = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("application.applicant", "applicant")
      .leftJoinAndSelect("interview.feedback", "feedback")
      .leftJoinAndSelect("interview.CancelInterview", "cancel")

      .where("applicant.id = :applicantId", { applicantId })

      .select([
        "interview",

        "application",

        "job.id",
        "job.title",

        "company.id",
        "company.name",

        "feedback",

        "cancel",
      ])

      .getMany();

    if (!interviews)
      throw new BadRequestException("there is no interview for this applicant");

    return { data: { interviews } };
  }

  public async getInterviewStatsWithCompany(companyId: string) {
    const total = await this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoin("jobApply.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("jobApply.interviews", "interview")
      .where("company.id = :companyId", { companyId })
      .andWhere("interview.id IS NOT NULL")
      .getCount();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayInterview = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .where("company.id = :companyId", { companyId })
      .andWhere("interview.scheduledAt BETWEEN :start AND :end", {
        start: startOfDay,
        end: endOfDay,
      })
      .getCount();

    const upcoming = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .where("company.id = :companyId", { companyId })
      .andWhere("interview.status IN (:...statuses)", {
        statuses: [InterviewStatus.SCHEDULED, InterviewStatus.RESCHEDULED],
      })
      .getCount();

    const completed = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .where("company.id = :companyId", { companyId })
      .andWhere("interview.status = :status", {
        status: InterviewStatus.COMPLETED,
      })
      .getCount();

    return {
      data: {
        total,
        todayInterview,
        upcoming,
        completed,
      },
    };
  }

  public async getInterviewStatsWithApplicant(applicantId: string) {
    const total = await this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoin("jobApply.applicant", "applicant")
      .leftJoin("jobApply.interviews", "interview")
      .where("applicant.id = :applicantId", { applicantId })
      .andWhere("interview.id IS NOT NULL")
      .getCount();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayInterview = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.applicant", "applicant")
      .where("applicant.id = :applicantId", { applicantId })
      .andWhere("interview.scheduledAt BETWEEN :start AND :end", {
        start: startOfDay,
        end: endOfDay,
      })
      .getCount();

    const upcoming = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.applicant", "applicant")
      .where("applicant.id = :applicantId", { applicantId })
      .andWhere("interview.status IN (:...statuses)", {
        statuses: [InterviewStatus.SCHEDULED, InterviewStatus.RESCHEDULED],
      })
      .getCount();

    const completed = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.applicant", "applicant")
      .where("applicant.id = :applicantId", { applicantId })
      .andWhere("interview.status = :status", {
        status: InterviewStatus.COMPLETED,
      })
      .getCount();

    return {
      data: {
        total,
        todayInterview,
        upcoming,
        completed,
      },
    };
  }

  private async checkInterviewConflict(
    companyId: string,
    scheduledAt: Date,
    durationMin: number,
  ) {
    const start = new Date(scheduledAt);
    const end = new Date(start.getTime() + durationMin * 60000);

    const conflict = await this.interviewRepository
      .createQueryBuilder("interview")
      .leftJoin("interview.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .where("company.id= :companyId", { companyId })
      .andWhere(
        `
          interview.scheduledAt < :end
          AND interview.scheduledAt + (:duration * interval '1 minute') > :start
        `,
        {
          start,
          end,
          duration: durationMin,
        },
      )
      .getOne();

    console.log(conflict);
    if (conflict) {
      const formattedStart = new Date(conflict.scheduledAt).toLocaleString(
        "en-EG",
        { timeZone: "Africa/Cairo" },
      );

      const formattedEnd = new Date(
        conflict.scheduledAt.getTime() + durationMin * 60000,
      ).toLocaleString("en-EG", {
        timeZone: "Africa/Cairo",
      });

      const newSelectedTime = new Date(scheduledAt).toLocaleString("en-EG", {
        timeZone: "Africa/Cairo",
      });

      throw new BadRequestException({
        message: "Interview time conflict",
        details: {
          message: `An interview is already scheduled from ${formattedStart} to ${formattedEnd}. The time you selected (${newSelectedTime}) overlaps with it. Please choose another available time.`,
        },
      });
    }
    return true;
  }
}
