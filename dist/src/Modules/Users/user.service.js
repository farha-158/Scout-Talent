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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const job_applicant_entity_1 = require("../Job/job_applicant.entity");
const candidateStatus_enum_1 = require("../../utils/Enums/candidateStatus.enum");
let UserService = class UserService {
    userRepository;
    jobApplicantRepository;
    constructor(userRepository, jobApplicantRepository) {
        this.userRepository = userRepository;
        this.jobApplicantRepository = jobApplicantRepository;
    }
    async findUser(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async basicInformation(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ["name", "email", "phone", "linkedIn_profile", "job_title", "location"]
        });
        return user;
    }
    async updateProfile(dto, id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException('no user found');
        await this.userRepository.update(id, dto);
        return true;
    }
    async addorupdateAbout(dto, id) {
        const company = await this.userRepository.findOne({ where: { id } });
        if (!company)
            throw new common_1.BadRequestException('no user found');
        const { About } = dto;
        company.About = About;
        await this.userRepository.save(company);
        return About;
    }
    async profileCompleteUser(id) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user)
            throw new common_1.BadRequestException('no user found');
        let percentage = 40;
        const skillsCompleted = user.skillsORspecializations?.length > 0;
        const experienceCompleted = user.experience?.length > 0;
        if (skillsCompleted)
            percentage += 30;
        if (experienceCompleted)
            percentage += 30;
        return {
            percentage,
            sections: {
                basicInfo: true,
                skillsCompleted,
                experienceCompleted
            }
        };
    }
    async dashboardStatisticsUser(id) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user)
            throw new common_1.BadRequestException('no user found');
        const totalApplicant = await this.jobApplicantRepository.count({
            where: {
                applicant: { id },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3))
            }
        });
        const inReview = await this.jobApplicantRepository.count({
            where: {
                applicant: { id },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
                status: candidateStatus_enum_1.CandidateStatus.SCREENING
            }
        });
        const interview = await this.jobApplicantRepository.count({
            where: {
                applicant: { id },
                createdAt: (0, typeorm_2.MoreThan)(this.getDateBeforeMonths(3)),
                status: candidateStatus_enum_1.CandidateStatus.INTERVIEW
            }
        });
        return {
            totalApplicant,
            inReview,
            interview
        };
    }
    async profileCompleteCompany(id) {
        const company = await this.userRepository.findOne({
            where: { id }
        });
        if (!company)
            throw new common_1.BadRequestException('no user found');
        let percentage = 40;
        const AboutCompleted = !!company.About?.trim();
        const specializationsCompleted = company.skillsORspecializations?.length > 0;
        if (AboutCompleted)
            percentage += 30;
        if (specializationsCompleted)
            percentage += 30;
        return {
            percentage,
            sections: {
                basicInfo: true,
                AboutCompleted,
                specializationsCompleted
            }
        };
    }
    getDateBeforeMonths(month) {
        const date = new Date();
        date.setMonth(date.getMonth() - month);
        return date;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(job_applicant_entity_1.JobApplicant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map