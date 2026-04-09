import { forwardRef, Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { UserModule } from "../Users/user.module";
import { CompanyController } from "./company.controller";
import { JobModule } from "../Job/job.module";
import { JwtModule } from "@nestjs/jwt";
import { JobApplicant } from "../application/job_applicant.entity";

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
  imports: [
    JwtModule,
    UserModule,
    forwardRef(() => JobModule),
    TypeOrmModule.forFeature([Company,JobApplicant]),
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
