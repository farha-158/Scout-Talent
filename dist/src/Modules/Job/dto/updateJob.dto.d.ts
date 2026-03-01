import { JobStatus, JobType, WorkMode } from "src/utils/Enums/job.enum";
export declare class updateJobDTO {
    title: string;
    location: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    type: JobType;
    status: JobStatus;
    workMode: WorkMode;
    description: string;
    skills: string[];
    responsibilities: string[];
    requirements: string;
}
