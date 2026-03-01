import { Job } from "./job.entity";
import { Repository } from "typeorm";
import { addJobDTO } from "./dto/addJob.dto";
import { UserService } from "../Users/user.service";
import { JobApplicant } from "./job_applicant.entity";
import { updateJobDTO } from "./dto/updateJob.dto";
import { CVService } from "../CV/cv.service";
import { applyJobDTO } from "./dto/applyJob.dto";
import { JobStatus, JobType, WorkMode } from "src/utils/Enums/job.enum";
import { jobStatusDTO } from "./dto/statusJob.dto";
export declare class JobServices {
    private jobRepository;
    private jobApplicantRepository;
    private userService;
    private cvService;
    constructor(jobRepository: Repository<Job>, jobApplicantRepository: Repository<JobApplicant>, userService: UserService, cvService: CVService);
    Addjob(dto: addJobDTO, companyId: number): Promise<{
        message: string;
    }>;
    getAllJob(): Promise<Job[]>;
    GetAllJobsByCompany(companyId: number, q?: JobStatus): Promise<Job[]>;
    GetAllJobsByCompanyApply(companyId: number, q?: string, status?: string): Promise<JobApplicant[]>;
    getJob(id: number): Promise<Job>;
    updateJob(companyId: number, id: number, dto: updateJobDTO): Promise<{
        message: string;
    }>;
    deleteJob(companyId: number, id: number): Promise<{
        message: string;
    }>;
    applyJob(applicantId: number, jobId: number, cvId: number, dto: applyJobDTO): Promise<{
        message: string;
    }>;
    screeningCV(companyId: number, jobId: number, userId: number): Promise<boolean>;
    rejectCV(companyId: number, jobId: number, userId: number): Promise<boolean>;
    hiredCV(companyId: number, jobId: number, userId: number): Promise<boolean>;
    jobApplicantionByUser(userId: number, search?: string, location?: string, jobType?: JobType, workMode?: WorkMode): Promise<JobApplicant[]>;
    dashboardStatisticsCompany(companyId: number): Promise<{
        activeJobs: number;
        totalCandidates: number;
        avgTimeToHireDays: number;
        offersSent: number;
        hired: number;
    }>;
    ChangeJobStatus(companyId: number, jobId: number, dto: jobStatusDTO): Promise<Job>;
    private getDateBeforeMonths;
}
