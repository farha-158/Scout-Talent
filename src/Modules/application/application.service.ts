import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import {
  Brackets,
  DataSource,
  EntityManager,
  Repository,
} from "typeorm";
import { JobApplicant } from "./job_applicant.entity";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { CandidateStatus } from "../../Shared/Enums/candidateStatus.enum";
import { JobType, WorkMode } from "../../Shared/Enums/job.enum";
import { applyJobDTO } from "./dto/applyJob.dto";
import { ApplicantService } from "../applicant/applicant.service";
import { JobService } from "../Job/job.service";
import { Job } from "../Job/job.entity";
import { Reject } from "./reject.entity";
import { RejectDTO } from "./dto/reject.dto";
import { JobOfferDTO } from "./dto/jobOffer.dto";
import { HiredDTO } from "./dto/hired.dto";
import { OfferStatus } from "../../Shared/Enums/offerStatus.enum";
import { HiredDetails } from "./Hired_Details.entity";
import { InterviewDTO } from "./dto/interview.dto";
import { InterviewService } from "../interview/interview.service";
import { OfferService } from "../offer/offer.service";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,

    @InjectRepository(JobApplicant)
    private jobApplicantRepository: Repository<JobApplicant>,

    private applicantService: ApplicantService,

    private jobService: JobService,

    @Inject(forwardRef(() => InterviewService))
    private interviewService: InterviewService,

    @Inject(forwardRef(() => OfferService))
    private offerService: OfferService,
  ) {}

  public createApplication(
    data: Partial<JobApplicant>,
    manger?: EntityManager,
  ) {
    const repo = manger
      ? manger.getRepository(JobApplicant)
      : this.jobApplicantRepository;

    const applican = repo.create(data);

    return repo.save(applican);
  }

  public findOneByUserId(id: string, userId: string) {
    return this.jobApplicantRepository.findOne({
      where: {
        id,
        job: {
          company: { user: { id: userId } },
        },
      },
    });
  }

  public moveToScreening(application: JobApplicant) {
    application.status = CandidateStatus.SCREENING;
    application.screenAt = new Date();

    return this.jobApplicantRepository.save(application);
  }

  public moveToReject(application: JobApplicant, manger?: EntityManager) {
    const repo = manger
      ? manger.getRepository(JobApplicant)
      : this.jobApplicantRepository;

    application.status = CandidateStatus.REJECTED;
    application.rejectAt = new Date();

    return repo.save(application);
  }

  public moveToHired(application: JobApplicant, manger?: EntityManager) {
    const repo = manger
      ? manger.getRepository(JobApplicant)
      : this.jobApplicantRepository;

    application.status = CandidateStatus.HIRED;
    application.hiredAt = new Date();

    return repo.save(application);
  }

  public moveToInterview(application: JobApplicant, manger?: EntityManager) {
    const repo = manger
      ? manger.getRepository(JobApplicant)
      : this.jobApplicantRepository;

    application.status = CandidateStatus.INTERVIEW;
    application.interviewAt = new Date();

    return repo.save(application);
  }

  public moveToOffer(application: JobApplicant, manger?: EntityManager) {
    const repo = manger
      ? manger.getRepository(JobApplicant)
      : this.jobApplicantRepository;

    application.status = CandidateStatus.OFFERED;
    application.sendOfferAt = new Date();

    return repo.save(application);
  }

  public async GetAllJobsByCompanyApply(
    userId: string,
    q?: string,
    status?: string,
  ) {
    const jobsApply = this.jobApplicantRepository
      .createQueryBuilder("jobApply")

      .leftJoin("jobApply.applicant", "applicant")
      .leftJoin("jobApply.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("company.user", "user")

      .select([
        "jobApply.id",
        "jobApply.status",

        "job.id",
        "job.title",
        "job.skills",

        "applicant.id",
        "applicant.name",
        "applicant.job_title",
      ])

      .where("user.id = :userId", { userId });

    if (q) {
      jobsApply.andWhere(
        new Brackets((qb) => {
          qb.where("LOWER(job.title) LIKE LOWER(:q)", {
            q: `%${q}%`,
          }).orWhere("LOWER(job.skills) LIKE LOWER(:q)", {
            q: `%${q}%`,
          });
        }),
      );
    }

    if (status) {
      jobsApply.andWhere("jobApply.status = :status", { status });
    }

    return { jobsApply: await jobsApply.getMany() };
  }

  public async alljobsApplicantionByApplicant(
    userId: string,
    search?: string,
    location?: string,
    jobType?: JobType,
    workMode?: WorkMode,
  ) {
    const jobsApply = this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoinAndSelect("jobApply.job", "job")
      .leftJoinAndSelect("job.company", "company")
      .leftJoin("jobApply.applicant", "applicant")
      .leftJoin("applicant.user", "user")
      .where(" user.id= :userId", { userId });

    if (search) {
      jobsApply.andWhere("LOWER(job.title) LIKE LOWER(:search)", {
        search: `%${search}%`,
      });
    }

    if (location) {
      jobsApply.andWhere("LOWER(job.location) LIKE LOWER(:location)", {
        location: `%${location}%`,
      });
    }

    if (jobType) {
      jobsApply.andWhere("LOWER(job.type) LIKE LOWER(:jobType)", {
        jobType: `%${jobType}%`,
      });
    }

    if (workMode) {
      jobsApply.andWhere("LOWER(job.workMode) LIKE LOWER(:workMode)", {
        workMode: `%${workMode}%`,
      });
    }

    return jobsApply.getMany();
  }

  public async jobApplicantionByUserByID(userId: string, jobApplyId: string) {
    const jobApplyById = await this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoin("jobApply.applicant", "applicant")
      .leftJoin("applicant.user", "user")
      .leftJoinAndSelect("jobApply.job", "job")
      .leftJoinAndSelect("job.company", "company")
      .leftJoinAndSelect("jobApply.hiredDetails", "hiredDetails")
      .leftJoinAndSelect("jobApply.offer", "offer")
      .leftJoinAndSelect("jobApply.interviews", "interviews")
      .leftJoinAndSelect("jobApply.reject", "reject")
      .where("jobApply.id = :jobApplyId AND user.id = :userId", {
        jobApplyId,
        userId,
      })
      .getOne();

    if (!jobApplyById) throw new BadRequestException("not found Application");

    return jobApplyById;
  }

  public countAllInterviewFromCompany(userId: string) {
    return this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoin("jobApply.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("company.user", "user")
      .leftJoin("jobApply.interviews", "interview")
      .where("user.id = :userId", { userId })
      .andWhere("interview.id IS NOT NULL")
      .getCount();
  }

  public countAllInterviewFromApplicant(userId: string) {
    return this.jobApplicantRepository
      .createQueryBuilder("jobApply")
      .leftJoin("jobApply.applicant", "applicant")
      .leftJoin("applicant.user", "user")
      .leftJoin("jobApply.interviews", "interview")
      .where("user.id = :userId", { userId })
      .andWhere("interview.id IS NOT NULL")
      .getCount();
  }

  public async applyJob(
    userId: string,
    jobId: string,
    cvId: string,
    dto: applyJobDTO,
  ) {
    const {applicant,cv} = await this.applicantService.findApplicantWithIdUserAndIdCv(
      userId,
      cvId,
    );

    if (!applicant || !cv) throw new BadRequestException("please try again");

    const job = await this.jobService.findJob(jobId);
    if (!job) throw new BadRequestException("please try again");

    const { about } = dto;

    await this.dataSource.transaction(async (manager) => {
      if (job.applicationsCount >= job.maxApplications) {
        throw new BadRequestException(
          "This job has reached the maximum number of applications and is now closed.",
        );
      }
      await manager.increment(Job, { id: job.id }, "applicationsCount", 1);

      const jobApp = this.createApplication(
        {
          applicant,
          job,
          about,
          cv,
        },
        manager,
      );

      await manager.save(jobApp);
    });

    return { message: "application the job successful" };
  }

  public async screeningCV(userId: string, id: string) {
    const jobApplication = await this.findOneByUserId(id, userId);

    if (!jobApplication) throw new BadRequestException("please try again");

    if (jobApplication.status === CandidateStatus.SCREENING) {
      throw new BadRequestException("status of candidate is already screening");
    }

    if (jobApplication.status === CandidateStatus.NEW) {
      const jobApp = await this.moveToScreening(jobApplication);

      return {
        message: "convert candidate status to screening successful",
        jobApp: {
          id: jobApp.id,
          status: jobApp.status,
          screenAt: jobApp.screenAt,
        },
      };
    }
    return {
      message:
        "can't convert candidate status to screening, check candidate status",
      jobApp: {
        id: jobApplication.id,
        status: jobApplication.status,
      },
    };
  }

  public async rejectCV(
    userId: string,
    id: string,
    dto: RejectDTO,
    manager?: EntityManager,
  ) {
    const jobApplication = await this.findOneByUserId(id, userId);

    if (!jobApplication) throw new BadRequestException("please try again");

    if (jobApplication.status === CandidateStatus.REJECTED) {
      throw new BadRequestException("status of candidate is already rejected");
    }

    if (jobApplication.status === CandidateStatus.HIRED) {
      throw new BadRequestException("this applicantion is hired, can't reject");
    }

    const exec = async (manager: EntityManager) => {
      const jobApp = await this.moveToReject(jobApplication, manager);

      const reject = manager.create(Reject, {
        reason: dto.reason,
        application: jobApp,
      });

      const Nreject = await manager.save(reject);

      return {
        message: "convert cadidate status to rejected successful",
        data: {
          id: jobApp.id,
          status: jobApp.status,
          rejectId: Nreject.id,
          reason: Nreject.reason,
          rejectAt: jobApp.rejectAt,
        },
      };
    };

    if (manager) {
      return exec(manager);
    }

    return this.dataSource.transaction(exec);
  }

  public async hiredCV(userId: string, id: string, dto: HiredDTO) {
    const { startDate } = dto;

    const jobAppDB = await this.findOneByUserId(id, userId);

    if (!jobAppDB) {
      throw new BadRequestException("please try again");
    }

    return await this.dataSource.transaction(async (manager) => {
      if (jobAppDB.status === CandidateStatus.HIRED) {
        throw new BadRequestException("status of candidate is already hired");
      }

      if (jobAppDB.status !== CandidateStatus.OFFERED) {
        throw new BadRequestException(
          `the candidate status ${jobAppDB.status}, can't hired`,
        );
      }

      if (jobAppDB.offer.status !== OfferStatus.ACCEPTED) {
        throw new BadRequestException(
          "this offer is not accepted , can't hired",
        );
      }

      if (jobAppDB.job.acceptedCount >= jobAppDB.job.positions) {
        throw new BadRequestException("Hiring limit reached");
      }

      const jobApply = await this.moveToHired(jobAppDB, manager);

      await manager.increment(Job, { id: jobAppDB.job.id }, "acceptedCount", 1);

      const hired = manager.create(HiredDetails, {
        startDate,
        application: jobAppDB,
      });

      const savedHired = await manager.save(hired);

      return {
        message: "convert candidate status to hired successful",
        data: {
          id: jobApply.id,
          status: jobApply.status,
          hiredAt: jobApply.hiredAt,
          startDate: savedHired.startDate,
        },
      };
    });
  }

  public async interviewCV(
    userId: string,
    id: string,
    dto: InterviewDTO,
    manager?: EntityManager,
  ) {
    const jobApplicantion = await this.findOneByUserId(id, userId);

    if (!jobApplicantion) throw new BadRequestException("please try again");

    if (
      !(
        jobApplicantion.status === CandidateStatus.SCREENING ||
        jobApplicantion.status === CandidateStatus.INTERVIEW
      )
    ) {
      throw new BadRequestException(
        `can't interview ,the candidate status is ${jobApplicantion.status}`,
      );
    }
    const { type, scheduledAt, meetingLink, durationMin } = dto;

    const scheduledDate = new Date(scheduledAt);

    if (scheduledDate <= new Date()) {
      throw new BadRequestException("the scheduled date must be in the future");
    }

    await this.interviewService.checkInterviewConflict(
      userId,
      scheduledDate,
      durationMin,
    );

    const exce = async (manager: EntityManager) => {
      const jobApp = await this.moveToInterview(jobApplicantion, manager);

      const interview = await this.interviewService.createInterview(
        {
          type,
          scheduledAt: scheduledDate,
          meetingLink,
          durationMin,
          application: jobApp,
        },
        manager,
      );

      return {
        message: "convert cadidate status to interview successful",
        data: {
          jobApplyid: jobApp.id,
          status: jobApp.status,
          interviewId: interview.id,
          interviewtype: type,
          scheduledAt: interview.scheduledAt,
          meetingLink,
          interviewAt: jobApp.interviewAt,
        },
      };
    };

    if (manager) {
      return exce(manager);
    }

    return this.dataSource.transaction(exce);
  }

  public async jobOffer(
    userId: string,
    id: string,
    dto: JobOfferDTO,
    manager?: EntityManager,
  ) {
    const jobApplicantion = await this.findOneByUserId(id, userId);
    if (!jobApplicantion) throw new BadRequestException("please try again");

    if (jobApplicantion.status === CandidateStatus.OFFERED) {
      throw new BadRequestException("status of candidate is already offered");
    }

    const { startDate, offeredSalary, notes, expiresAt } = dto;

    const expiredDate = new Date(expiresAt);
    const startDateTime = new Date(startDate);

    if (expiredDate <= new Date()) {
      throw new BadRequestException("the expired date must be in the future");
    }

    const exce = async (manager: EntityManager) => {
      const jobApp = await this.moveToOffer(jobApplicantion, manager);

      const offer = await this.offerService.createOffer(
        {
          startDate: startDateTime,
          offeredSalary,
          notes,
          expiresAt: expiredDate,
          application: jobApp,
        },
        manager,
      );

      return {
        message: "convert cadidate status to interview successful",
        data: {
          id: jobApp.id,
          status: jobApp.status,
          offerId: offer.id,
          offeredSalary,
          startDate,
          notes,
          expiresAt,
          offerAt: jobApp.sendOfferAt,
        },
      };
    };

    if (manager) {
      return exce(manager);
    }
    return this.dataSource.transaction(exce);
  }

  private getDateBeforeMonths(month: number) {
    const date = new Date();

    date.setMonth(date.getMonth() - month);

    return date;
  }
}
