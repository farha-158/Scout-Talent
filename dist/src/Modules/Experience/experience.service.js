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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const experience_entity_1 = require("./experience.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../Users/user.service");
let ExperienceService = class ExperienceService {
    experienceRepository;
    userService;
    constructor(experienceRepository, userService) {
        this.experienceRepository = experienceRepository;
        this.userService = userService;
    }
    async addExperience(dto, userId) {
        const { title, description, startDate, endDate, company } = dto;
        const user = await this.userService.findUser(userId);
        if (!user)
            throw new common_1.BadRequestException('not user found');
        const nExper = this.experienceRepository.create({
            title, description, startDate, endDate, company, user
        });
        await this.experienceRepository.save(nExper);
        return { message: 'add experience successful' };
    }
    async updateExperience(dto, id) {
        const experience = await this.experienceRepository.findOne({ where: { id } });
        if (!experience)
            throw new common_1.BadRequestException('no experience found');
        await this.experienceRepository.update(id, dto);
        return { message: 'update experience successful' };
    }
    async deleteExperience(id) {
        const experience = await this.experienceRepository.findOne({ where: { id } });
        if (!experience)
            throw new common_1.BadRequestException('no experience found');
        await this.experienceRepository.delete(id);
        return { message: 'delete experience successful' };
    }
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(experience_entity_1.Experience)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map