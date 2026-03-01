import { JobServices } from "./job.service";
import { addJobDTO } from "./dto/addJob.dto";
import { updateJobDTO } from "./dto/updateJob.dto";
import type { JwtPayloadType } from "src/utils/type";
import { CandidateStatus } from "src/utils/Enums/candidateStatus.enum";
import { applyJobDTO } from "./dto/applyJob.dto";
import { JobStatus, JobType, WorkMode } from "src/utils/Enums/job.enum";
import { jobStatusDTO } from "./dto/statusJob.dto";
export declare class JobController {
    private jobService;
    constructor(jobService: JobServices);
    CreateJob(body: addJobDTO, company: JwtPayloadType): Promise<{
        message: string;
    }>;
    GetAllJobs(): Promise<import("./job.entity").Job[]>;
    GetAllJobsByCompany(company: JwtPayloadType, q?: JobStatus): Promise<import("./job.entity").Job[]>;
    GetAllJobsByCompanyApply(company: JwtPayloadType, q?: string, status?: CandidateStatus): Promise<import("./job_applicant.entity").JobApplicant[]>;
    GetJob(id: number): Promise<import("./job.entity").Job>;
    applyJob(user: JwtPayloadType, jobId: number, cvId: number, body: applyJobDTO): Promise<{
        message: string;
    }>;
    deleteJob(company: JwtPayloadType, id: number): Promise<{
        message: string;
    }>;
    updateJob(company: JwtPayloadType, id: number, body: updateJobDTO): Promise<{
        message: string;
    }>;
    screenCV(company: JwtPayloadType, jobId: number, userId: number): Promise<boolean>;
    rejectedCV(company: JwtPayloadType, jobId: number, userId: number): Promise<boolean>;
    hiredCV(company: JwtPayloadType, jobId: number, userId: number): Promise<boolean>;
    applicantJobByApplicant(user: JwtPayloadType, search?: string, location?: string, jobType?: JobType, workMode?: WorkMode): Promise<import("./job_applicant.entity").JobApplicant[]>;
    dashboardStatistics(company: JwtPayloadType): Promise<{
        activeJobs: number;
        totalCandidates: number;
        avgTimeToHireDays: number;
        offersSent: number;
        hired: number;
    }>;
    jobStatus(company: JwtPayloadType, jobId: number, body: jobStatusDTO): Promise<import("./job.entity").Job>;
}
