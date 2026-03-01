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
exports.SkillController = void 0;
const common_1 = require("@nestjs/common");
const skills_service_1 = require("./skills.service");
const user_enum_1 = require("../../utils/Enums/user.enum");
const addSkill_dto_1 = require("./dto/addSkill.dto");
const user_role_decorator_1 = require("../auth/decorator/user_role.decorator");
const AuthUser_guard_1 = require("../auth/guards/AuthUser.guard");
const currentUser_decorator_1 = require("../auth/decorator/currentUser.decorator");
const swagger_1 = require("@nestjs/swagger");
let SkillController = class SkillController {
    skillService;
    constructor(skillService) {
        this.skillService = skillService;
    }
    async addSkill(user, body) {
        return await this.skillService.addSkill(body, user.id);
    }
    async deleteSkill(user, id) {
        return await this.skillService.deleteSkill(id, user.id);
    }
};
exports.SkillController = SkillController;
__decorate([
    (0, common_1.Post)('applicant/skills'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT, user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addSkill_dto_1.addSkillDTO]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "addSkill", null);
__decorate([
    (0, common_1.Delete)('applicant/skills/:id'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT, user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "deleteSkill", null);
exports.SkillController = SkillController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [skills_service_1.SkillService])
], SkillController);
//# sourceMappingURL=skills.controller.js.map