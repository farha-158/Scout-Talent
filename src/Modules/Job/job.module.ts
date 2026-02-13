import { Module } from "@nestjs/common";
import { JobServices } from "./job.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobApplicant } from "./job_applicant.entity";


@Module({
    controllers:[],
    providers:[JobServices],
    imports:[TypeOrmModule.forFeature([Job,JobApplicant])]
})
export class JobModule{}