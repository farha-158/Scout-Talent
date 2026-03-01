import { JobStatus, JobType, WorkMode } from "src/utils/Enums/job.enum";
import { User } from "../Users/user.entity";
import { JobApplicant } from "./job_applicant.entity";
export declare class Job {
    id: number;
    title: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    type: JobType;
    status: JobStatus;
    workMode: WorkMode;
    description: string;
    skills: string[];
    responsibilities: string[];
    requirements: string;
    createdAt: Date;
    updatedAt: Date;
    company: User;
    applicants: JobApplicant[];
}
