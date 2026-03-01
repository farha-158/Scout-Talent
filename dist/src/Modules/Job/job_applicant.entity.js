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
exports.JobApplicant = void 0;
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
const user_entity_1 = require("../Users/user.entity");
const constant_1 = require("../../utils/Constant/constant");
const candidateStatus_enum_1 = require("../../utils/Enums/candidateStatus.enum");
const cv_entity_1 = require("../CV/cv.entity");
let JobApplicant = class JobApplicant {
    id;
    status;
    about;
    job;
    applicant;
    cv;
    createdAt;
    hiredAt;
};
exports.JobApplicant = JobApplicant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobApplicant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: candidateStatus_enum_1.CandidateStatus, default: candidateStatus_enum_1.CandidateStatus.NEW }),
    __metadata("design:type", String)
], JobApplicant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobApplicant.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, (job) => job.applicants, { eager: true }),
    __metadata("design:type", job_entity_1.Job)
], JobApplicant.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.jobApplicant, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], JobApplicant.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cv_entity_1.CV, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", cv_entity_1.CV)
], JobApplicant.prototype, "cv", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => constant_1.CURRENT_TIMESTAMP }),
    __metadata("design:type", Date)
], JobApplicant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, default: null }),
    __metadata("design:type", Date)
], JobApplicant.prototype, "hiredAt", void 0);
exports.JobApplicant = JobApplicant = __decorate([
    (0, typeorm_1.Entity)({ name: 'job_applicant' })
], JobApplicant);
//# sourceMappingURL=job_applicant.entity.js.map