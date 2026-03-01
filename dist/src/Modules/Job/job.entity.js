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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const constant_1 = require("../../utils/Constant/constant");
const job_enum_1 = require("../../utils/Enums/job.enum");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../Users/user.entity");
const job_applicant_entity_1 = require("./job_applicant.entity");
let Job = class Job {
    id;
    title;
    location;
    minSalary;
    maxSalary;
    type;
    status;
    workMode;
    description;
    skills;
    responsibilities;
    requirements;
    createdAt;
    updatedAt;
    company;
    applicants;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "minSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "maxSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: job_enum_1.JobType }),
    __metadata("design:type", String)
], Job.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: job_enum_1.JobStatus, default: job_enum_1.JobStatus.DRAFT }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: job_enum_1.WorkMode }),
    __metadata("design:type", String)
], Job.prototype, "workMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Job.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Job.prototype, "responsibilities", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => constant_1.CURRENT_TIMESTAMP }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => constant_1.CURRENT_TIMESTAMP, onUpdate: constant_1.CURRENT_TIMESTAMP }),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.jobs, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Job.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_applicant_entity_1.JobApplicant, (jobApllicant) => jobApllicant.applicant),
    __metadata("design:type", Array)
], Job.prototype, "applicants", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)({ name: 'jobs' })
], Job);
//# sourceMappingURL=job.entity.js.map