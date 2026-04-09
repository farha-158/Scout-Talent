import { forwardRef, Module } from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { ApplicantController } from "./applicant.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Applicant } from "./applicant.entity";
import { UserModule } from "../Users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { CVModule } from "../CV/cv.module";
import { JobApplicant } from "../application/job_applicant.entity";


@Module({
  providers: [ApplicantService],
  controllers: [ApplicantController],
  imports: [
    JwtModule,
    UserModule,
    forwardRef(()=>CVModule),
    TypeOrmModule.forFeature([Applicant,JobApplicant]),
  ],
  exports: [ApplicantService],
})
export class ApplicantModule {}
