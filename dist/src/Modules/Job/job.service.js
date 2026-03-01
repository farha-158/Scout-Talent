"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("./job.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../Users/user.service");
const job_applicant_entity_1 = require("./job_applicant.entity");
const cv_service_1 = require("../CV/cv.service");
const candidateStatus_enum_1 = require("../../utils/Enums/candidateStatus.enum");
const typeorm_3 = require("typeorm");
const job_enum_1 = require("../../utils/Enums/job.enum");
let JobServices = class JobServices {
    jobRepository;
    jobApplicantRepository;
    userService;
    cvService;
    constructor(jobRepository, jobApplicantRepository, userService, cvService) {
        this.jobRepository = jobRepository;
        this.jobApplicantRepository = jobApplicantRepository;
        this.userService = userService;
        this.cvService = cvService;
    }
    async Addjob(dto, companyId) {
        const { title, description, status, skills, location, minSalary, maxSalary, requirements, type, workMode, responsibilities } = dto;
        const user = await this.userService.findUser(companyId);
        if (!user)
            throw new common_1.BadRequestException('please try again');
        const Njob = this.jobRepository.create({
            title, description, location,
            minSalary, maxSalary, status, requirements,
            type, workMode, skills, responsibilities, company: user
        });
        await this.jobRepository.save(Njob);
        return { message: 'add job successful' };
    }
    async getAllJob() {
        const jobs = await this.jobRepository.find({
            where: {
                status: job_enum_1.JobStatus.PUBLISHED
            }
        });
        return jobs;
    }
    async GetAllJobsByCompany(companyId, q) {
        const company = await this.userService.findUser(companyId);
        if (!company)
            throw new common_1.BadRequestException('please try again');
        const jobs = this.jobRepository
            .createQueryBuilder('job')
            .where('job.companyId = :companyId', { companyId });
        if (q) {
            jobs.andWhere('job.status = :q', { q });
        }
        return await jobs.getMany();
    }
    async GetAllJobsByCompanyApply(companyId, q, status) {
        const company = await this.userService.findUser(companyId);
        if (!company)
            throw new common_1.BadRequestException('please try again');
        const jobsApply = this.jobApplicantRepository
            .createQueryBuilder('jobApply')
            .leftJoinAndSelect('jobApply.job', 'job')
            .where('job.companyId = :companyId', { companyId });
        if (q) {
            jobsApply.andWhere(new typeorm_3.Brackets((qb) => {
                qb.where('LOWER(job.title) LIKE LOWER(:q)', {
                    q: `%${q}%`,
                }).orWhere('LOWER(job.skills) LIKE LOWER(:q)', {
                    q: `%${q}%`,
                });
            }));
        }
        if (status) {
            jobsApply.andWhere('jobApply.status = :status', { status });
        }
        return await jobsApply.getMany();
    }
    async getJob(id) {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.BadRequestException('not found job');
        }
        return job;
    }
    async updateJob(companyId, id, dto) {
        const job = await this.jobRepository.findOne({
            where: {
                id,
                company: {
                    id: companyId
                }
            }
        });
        if (!job) {
            throw new common_1.BadRequestException('not found job');
        }
        await this.jobRepository.update(id, dto);
        return { message: "Job updated successfully" };
    }
    async deleteJob(companyId, id) {
        const job = await this.jobRepository.findOne({
            where: {
                id,
                company: {
                    id: companyId
                }
            }
        });
        if (!job) {
            throw new common_1.BadRequestException('not found job');
        }
        await this.jobRepository.remove(job);
        return { message: "Job deleted successfully" };
    }
    async applyJob(applicantId, jobId, cvId, dto) {
        const user = await this.userService.findUser(applicantId);
        if (!user)
            throw new common_1.BadRequestException('please try again');
        const job = await this.jobRepository.findOne({ where: { id: jobId } });
        if (!job)
            throw new common_1.BadRequestException('please try again');
        const cv = await this.cvService.findCV(cvId);
        if (!cv)
            throw new common_1.BadRequestException('try again');
        const { about } = dto;
        const jobApp = this.jobApplicantRepository.create({ applicant: user, job, cv, about });
        await this.jobApplicantRepository.save(jobApp);
        return { message: 'application the job successful' };
    }
    async screeningCV(companyId, jobId, userId) {
        const jobApplicantion = await this.jobApplicantRepository.findOne({
            where: {
                job: {
                    id: jobId,
                    company: { id: companyId }
                },
                applicant: { id: userId }
            }
        });
        if (!jobApplicantion)
            throw new common_1.BadRequestException('please try again');
        jobApplicantion.status = candidateStatus_enum_1.CandidateStatus.SCREENING;
        await this.jobApplicantRepository.save(jobApplicantion);
        return true;
    }
    async rejectCV(companyId, jobId, userId) {
        const jobApplicantion = await this.jobApplicantRepository.findOne({
            where: {
                job: {
                    id: jobId,
                    company: { id: companyId }
                },
                applicant: { id: userId }
            }
        });
        if (!jobApplicantion)
            throw new common_1.BadRequestException('please try again');
        jobApplicantion.status = candidateStatus_enum_1.CandidateStatus.REJECTED;
        await this.jobApplicantRepository.save(jobApplicantion);
        return true;
    }
    async hiredCV(companyId, jobId, userId) {
        const jobApplicantion = await this.jobApplicantRepository.findOne({
            where: {
                job: {
                    id: jobId,
                    company: { id: companyId }
                },
                applicant: { id: userId }
            }
        });
        if (!jobApplicantion)
            throw new common_1.BadRequestException('please try again');
        jobApplicantion.status = candidateStatus_enum_1.CandidateStatus.HIRED;
        jobApplicantion.hiredAt = new Date();
        await this.jobApplicantRepository.save(jobApplicantion);
        return true;
    }
    async jobApplicantionByUser(userId, search, location, jobType, workMode) {
        const jobsApply = this.jobApplicantRepository
            .createQueryBuilder('jobApply')
            .leftJoinAndSelect('jobApply.job', 'job')
            .where('jobApply.applicant = :userId', { userId });
        if (search) {
            jobsApply.andWhere('LOWER(job.title) LIKE LOWER(:search)', { search: `%${search}%` });
        }
        if (location) {
            jobsApply.andWhere('LOWER(job.location) LIKE LOWER(:location)', { location: `%${location}%` });
        }
        if (jobType) {
            jobsApply.andWhere('LOWER(job.type) LIKE LOWER(:jobType)', { jobType: `%${jobType}%` });
        }
        if (workMode) {
            jobsApply.andWhere('LOWER(job.workMode) LIKE LOWER(:workMode)', { workMode: `%${workMode}%` });
        }
        return jobsApply.getMany();
    }
    async dashboardStatisticsCompany(companyId) {
        const company = await this.userService.findUser(companyId);
        if (!company)
            throw new common_1.BadRequestException('no user found');
        const activeJobs = await this.jobRepository.count({
            where: {
                company: { id: companyId },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
                status: job_enum_1.JobStatus.PUBLISHED
            }
        });
        const totalCandidates = await this.jobApplicantRepository.count({
            where: {
                job: { company: { id: companyId } },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
            }
        });
        const lastJob = await this.jobRepository.findOne({
            where: {
                company: { id: companyId }
            },
            order: {
                createdAt: 'DESC'
            }
        });
        const hiredApplicant = await this.jobApplicantRepository.findOne({
            where: {
                job: { id: lastJob?.id },
                status: candidateStatus_enum_1.CandidateStatus.HIRED
            },
            order: {
                hiredAt: 'ASC'
            }
        });
        let avgTimeToHireDays = 0;
        if (hiredApplicant && hiredApplicant.hiredAt && lastJob) {
            const MS_IN_DAY = 1000 * 60 * 60 * 24;
            avgTimeToHireDays = Math.floor((hiredApplicant.hiredAt.getTime() -
                lastJob.createdAt.getTime()) / MS_IN_DAY);
        }
        const offersSent = await this.jobApplicantRepository.count({
            where: {
                job: { company: { id: companyId } },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
                status: candidateStatus_enum_1.CandidateStatus.OFFERED
            }
        });
        const hired = await this.jobApplicantRepository.count({
            where: {
                job: { company: { id: companyId } },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
                status: candidateStatus_enum_1.CandidateStatus.HIRED
            }
        });
        return {
            activeJobs,
            totalCandidates,
            avgTimeToHireDays,
            offersSent,
            hired
        };
    }
    async ChangeJobStatus(companyId, jobId, dto) {
        const job = await this.jobRepository.findOne({
            where: {
                id: jobId,
                company: { id: companyId }
            }
        });
        if (!job)
            throw new common_1.BadRequestException('no job found');
        const { status } = dto;
        job.status = status;
        await this.jobRepository.save(job);
        return job;
    }
    getDateBeforeMonths(month) {
        const date = new Date();
        date.setMonth(date.getMonth() - month);
        return date;
    }
};
exports.JobServices = JobServices;
exports.JobServices = JobServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(job_applicant_entity_1.JobApplicant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        cv_service_1.CVService])
], JobServices);
//# sourceMappingURL=job.service.js.map