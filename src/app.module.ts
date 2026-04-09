import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserModule } from "./Modules/Users/user.module";
import { MailModule } from "./Shared/Mail/mail.module";
import { CVModule } from "./Modules/CV/cv.module";
import { JobModule } from "./Modules/Job/job.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { SkillModule } from "./Modules/Skills/skills.module";
import { ExperienceModule } from "./Modules/Experience/experience.module";
import { AuthModule } from "./Modules/auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JobCornModule } from "./JobsCorn/jobCorn.module";
import { ApplicantModule } from "./Modules/applicant/applicant.module";
import { CompanyModule } from "./Modules/company/company.module";
import { InterviewModule } from "./Modules/interview/interview.module";
import { SpecializationModule } from "./Modules/specialization/specialization.module";
import { dataSourceOptions } from "../db/data_source";
import { ApplicationModule } from "./Modules/application/application.module";
import { OfferModule } from "./Modules/offer/offer.module";

@Module({
  imports: [
    OfferModule,
    JobModule,

    UserModule,
    CVModule,
    ApplicantModule,
    ApplicationModule,
    SkillModule,
    SpecializationModule,
    JobCornModule,
    ExperienceModule,
    MailModule,
    AuthModule,
    CompanyModule,
    InterviewModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
})
export class AppModule {}
