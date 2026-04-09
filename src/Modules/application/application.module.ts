import { forwardRef, Module } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { JobApplicant } from "./job_applicant.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicantModule } from "../applicant/applicant.module";
import { JobModule } from "../Job/job.module";
import { CandidateController } from "./candidate.controller";
import { Reject } from "./reject.entity";
import { HiredDetails } from "./Hired_Details.entity";
import { InterviewModule } from "../interview/interview.module";
import { OfferModule } from "../offer/offer.module";

@Module({
  providers: [ApplicationService],
  controllers: [CandidateController],
  imports: [
    TypeOrmModule.forFeature([JobApplicant, Reject, HiredDetails]),
    ApplicantModule,
    JobModule,
    forwardRef(() => InterviewModule),
    forwardRef(() => OfferModule),
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
