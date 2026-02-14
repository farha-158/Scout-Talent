import { Module } from "@nestjs/common";
import { JobServices } from "./job.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobApplicant } from "./job_applicant.entity";
import { JobController } from "./job.controller";
import { UserModule } from "../Users/user.module";


@Module({
    controllers:[JobController],
    providers:[JobServices],
    imports:[UserModule,TypeOrmModule.forFeature([Job,JobApplicant])]
})
export class JobModule{}