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
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../Users/user.service");
const skills_entity_1 = require("./skills.entity");
let SkillService = class SkillService {
    skillRepository;
    userService;
    constructor(skillRepository, userService) {
        this.skillRepository = skillRepository;
        this.userService = userService;
    }
    async addSkill(dto, Id) {
        const { name } = dto;
        const user = await this.userService.findUser(Id);
        if (!user)
            throw new common_1.BadRequestException('not user found');
        const skill = await this.skillRepository.findOne({ where: { name } });
        if (skill)
            throw new common_1.BadRequestException('name of skill already in your skills');
        const NSkill = this.skillRepository.create({ name, userORcompany: user });
        await this.skillRepository.save(NSkill);
        return { message: 'add skill successful' };
    }
    async deleteSkill(id, userId) {
        const skill = await this.skillRepository.findOne({
            where: {
                id,
                userORcompany: { id: userId }
            }
        });
        if (!skill)
            throw new common_1.BadRequestException('no found skill');
        await this.skillRepository.remove(skill);
        return { message: 'skill delete successful' };
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skills_entity_1.SkillOrSpecializations)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], SkillService);
//# sourceMappingURL=skills.service.js.map