import { JobStatus, JobType, WorkMode } from "src/utils/Enums/job.enum";
export declare class addJobDTO {
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
}
