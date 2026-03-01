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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const addJob_dto_1 = require("./dto/addJob.dto");
const user_enum_1 = require("../../utils/Enums/user.enum");
const updateJob_dto_1 = require("./dto/updateJob.dto");
const candidateStatus_enum_1 = require("../../utils/Enums/candidateStatus.enum");
const applyJob_dto_1 = require("./dto/applyJob.dto");
const user_role_decorator_1 = require("../auth/decorator/user_role.decorator");
const AuthUser_guard_1 = require("../auth/guards/AuthUser.guard");
const currentUser_decorator_1 = require("../auth/decorator/currentUser.decorator");
const job_enum_1 = require("../../utils/Enums/job.enum");
const statusJob_dto_1 = require("./dto/statusJob.dto");
const swagger_1 = require("@nestjs/swagger");
let JobController = class JobController {
    jobService;
    constructor(jobService) {
        this.jobService = jobService;
    }
    async CreateJob(body, company) {
        return await this.jobService.Addjob(body, company.id);
    }
    async GetAllJobs() {
        return await this.jobService.getAllJob();
    }
    async GetAllJobsByCompany(company, q) {
        return await this.jobService.GetAllJobsByCompany(company.id, q);
    }
    async GetAllJobsByCompanyApply(company, q, status) {
        return await this.jobService.GetAllJobsByCompanyApply(company.id, q, status);
    }
    async GetJob(id) {
        return await this.jobService.getJob(id);
    }
    async applyJob(user, jobId, cvId, body) {
        return await this.jobService.applyJob(user.id, jobId, cvId, body);
    }
    async deleteJob(company, id) {
        return await this.jobService.deleteJob(company.id, id);
    }
    async updateJob(company, id, body) {
        return await this.jobService.updateJob(company.id, id, body);
    }
    async screenCV(company, jobId, userId) {
        return await this.jobService.screeningCV(company.id, jobId, userId);
    }
    async rejectedCV(company, jobId, userId) {
        return await this.jobService.rejectCV(company.id, jobId, userId);
    }
    async hiredCV(company, jobId, userId) {
        return await this.jobService.hiredCV(company.id, jobId, userId);
    }
    async applicantJobByApplicant(user, search, location, jobType, workMode) {
        return await this.jobService.jobApplicantionByUser(user.id, search, location, jobType, workMode);
    }
    async dashboardStatistics(company) {
        return await this.jobService.dashboardStatisticsCompany(company.id);
    }
    async jobStatus(company, jobId, body) {
        return await this.jobService.ChangeJobStatus(company.id, jobId, body);
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Post)('createJob'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_decorator_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addJob_dto_1.addJobDTO, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "CreateJob", null);
__decorate([
    (0, common_1.Get)('allJob'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "GetAllJobs", null);
__decorate([
    (0, common_1.Get)('company/jobs'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "GetAllJobsByCompany", null);
__decorate([
    (0, common_1.Get)('company/jobsApply'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('s')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "GetAllJobsByCompanyApply", null);
__decorate([
    (0, common_1.Get)('jobs/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "GetJob", null);
__decorate([
    (0, common_1.Post)('applyJob/:jobId/:cvId'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('cvId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, applyJob_dto_1.applyJobDTO]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "applyJob", null);
__decorate([
    (0, common_1.Delete)('company/jobs/:id'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Put)('company/jobs/:id'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updateJob_dto_1.updateJobDTO]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Get)('screenCV/:jobId/:userId'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "screenCV", null);
__decorate([
    (0, common_1.Get)('rejectedCV/:jobId/:userId'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "rejectedCV", null);
__decorate([
    (0, common_1.Get)('hiredCV/:jobId/:userId'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "hiredCV", null);
__decorate([
    (0, common_1.Get)('applicantJobByApplicant'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('location')),
    __param(3, (0, common_1.Query)('jobType')),
    __param(4, (0, common_1.Query)('workMode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "applicantJobByApplicant", null);
__decorate([
    (0, common_1.Get)('company/dashboard-stats'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "dashboardStatistics", null);
__decorate([
    (0, common_1.Post)('company/jobs/:jobId/status'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)("jobId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, statusJob_dto_1.jobStatusDTO]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "jobStatus", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [job_service_1.JobServices])
], JobController);
//# sourceMappingURL=job.controller.js.map