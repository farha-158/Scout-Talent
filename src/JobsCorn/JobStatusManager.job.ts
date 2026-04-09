import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Job } from "../Modules/Job/job.entity";
import { JobStatus } from "../Shared/Enums/job.enum";

@Injectable()
export class JobStatusService {
  constructor(@InjectRepository(Job) private jobRepository: Repository<Job>) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleJobsStatus() {
    const now = new Date();

    const jobs = await this.jobRepository.find({
      where: [{ status: JobStatus.PUBLISHED }, { status: JobStatus.PAUSED }],
      take: 12,
    });
    for (const job of jobs) {
      let status = job.status;
      if (now > job.deadline) {
        status = JobStatus.EXPIRED;
      } else if (job.acceptedCount >= job.positions) {
        status = JobStatus.FILLED;
      } else if (job.applicationsCount >= job.maxApplications) {
        status = JobStatus.APPLICATIONS_FULL;
      }

      job.status = status;
      await this.jobRepository.save(job);
    }
  }
}
