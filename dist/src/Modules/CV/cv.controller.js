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
exports.CVController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cv_service_1 = require("./cv.service");
const user_role_decorator_1 = require("../auth/decorator/user_role.decorator");
const user_enum_1 = require("../../utils/Enums/user.enum");
const AuthUser_guard_1 = require("../auth/guards/AuthUser.guard");
const currentUser_decorator_1 = require("../auth/decorator/currentUser.decorator");
const swagger_1 = require("@nestjs/swagger");
const cvUpload_dto_1 = require("./dto/cvUpload.dto");
let CVController = class CVController {
    cvService;
    constructor(cvService) {
        this.cvService = cvService;
    }
    async uploadCV(user, file) {
        if (!file)
            throw new common_1.BadRequestException('no file upload');
        return await this.cvService.uploadCV(user.id, file.path);
    }
};
exports.CVController = CVController;
__decorate([
    (0, common_1.Post)('/files/upload-cv'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cv')),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: cvUpload_dto_1.uploadImageDTO }),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CVController.prototype, "uploadCV", null);
exports.CVController = CVController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cv_service_1.CVService])
], CVController);
//# sourceMappingURL=cv.controller.js.map