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
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
const user_enum_1 = require("../../utils/Enums/user.enum");
const addExperience_dto_1 = require("./dto/addExperience.dto");
const updateExperience_dto_1 = require("./dto/updateExperience.dto");
const user_role_decorator_1 = require("../auth/decorator/user_role.decorator");
const AuthUser_guard_1 = require("../auth/guards/AuthUser.guard");
const currentUser_decorator_1 = require("../auth/decorator/currentUser.decorator");
const swagger_1 = require("@nestjs/swagger");
let ExperienceController = class ExperienceController {
    experienceService;
    constructor(experienceService) {
        this.experienceService = experienceService;
    }
    async addExperience(body, user) {
        return await this.experienceService.addExperience(body, user.id);
    }
    async updateExperience(body, id) {
        return await this.experienceService.updateExperience(body, id);
    }
    async deleteExperience(id) {
        return await this.experienceService.deleteExperience(id);
    }
};
exports.ExperienceController = ExperienceController;
__decorate([
    (0, common_1.Post)('applicant/experiences'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_decorator_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addExperience_dto_1.addExperienceDTO, Object]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "addExperience", null);
__decorate([
    (0, common_1.Put)('applicant/experiences/:id'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateExperience_dto_1.updateExperienceDTO, Number]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "updateExperience", null);
__decorate([
    (0, common_1.Delete)('applicant/experiences/:id'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExperienceController.prototype, "deleteExperience", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map