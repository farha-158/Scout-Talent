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
exports.User = void 0;
const constant_1 = require("../../utils/Constant/constant");
const user_enum_1 = require("../../utils/Enums/user.enum");
const typeorm_1 = require("typeorm");
const job_entity_1 = require("../Job/job.entity");
const job_applicant_entity_1 = require("../Job/job_applicant.entity");
const cv_entity_1 = require("../CV/cv.entity");
const skills_entity_1 = require("../Skills/skills.entity");
const experience_entity_1 = require("../Experience/experience.entity");
let User = class User {
    id;
    name;
    email;
    password;
    phone;
    job_title;
    location;
    linkedIn_profile;
    role;
    About;
    refreshToken;
    isAccountVerified;
    verificationToken;
    resetPasswordToken;
    createAt;
    jobs;
    Cvs;
    skillsORspecializations;
    experience;
    jobApplicant;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "linkedIn_profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_enum_1.RoleUser, default: user_enum_1.RoleUser.APPLICANT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "About", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAccountVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => constant_1.CURRENT_TIMESTAMP }),
    __metadata("design:type", Date)
], User.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.Job, (job) => job.company),
    __metadata("design:type", Array)
], User.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cv_entity_1.CV, (cv) => cv.applicant),
    __metadata("design:type", Array)
], User.prototype, "Cvs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skills_entity_1.SkillOrSpecializations, (s) => s.userORcompany, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "skillsORspecializations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_entity_1.Experience, (experience) => experience.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_applicant_entity_1.JobApplicant, (jobApplicant) => jobApplicant.job),
    __metadata("design:type", Array)
], User.prototype, "jobApplicant", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map