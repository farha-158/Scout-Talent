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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const user_role_decorator_1 = require("./decorator/user_role.decorator");
const user_enum_1 = require("../../utils/Enums/user.enum");
const AuthUser_guard_1 = require("./guards/AuthUser.guard");
const currentUser_decorator_1 = require("./decorator/currentUser.decorator");
const forget_password_dto_1 = require("./dto/forget_password.dto");
const reset_password_dto_1 = require("./dto/reset_password.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(body) {
        const response = await this.authService.register(body);
        return response;
    }
    async login(res, body) {
        const { message, accessToken, refreshToken } = await this.authService.login(body);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return { message, accessToken };
    }
    async getAccessToken(req) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new common_1.BadRequestException('no refresh token');
        return await this.authService.getAccessToken(refreshToken);
    }
    async logOut(user, res) {
        await this.authService.logOut(user.id);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        return { msg: 'log out successful' };
    }
    async verifyEmail(id, verificationToken) {
        return await this.authService.verifyEmail(id, verificationToken);
    }
    async forgetPassword(body) {
        return await this.authService.forgetPassword(body);
    }
    async resetPassword(resetPasswordToken, id, body) {
        return await this.authService.resetPassword(body, id, resetPasswordToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.registerDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.loginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refreshToken'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.Post)('logOut'),
    (0, user_role_decorator_1.Roles)(user_enum_1.RoleUser.APPLICANT, user_enum_1.RoleUser.COMPANY),
    (0, common_1.UseGuards)(AuthUser_guard_1.AuthGuard),
    (0, swagger_1.ApiSecurity)('bearer'),
    __param(0, (0, currentUser_decorator_1.currentUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)('user/verify-email/:id/:verificationToken'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('verificationToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('user/forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.forgetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('user/reset_password/:id/:resetPasswordToken'),
    __param(0, (0, common_1.Param)('resetPasswordToken')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, reset_password_dto_1.resetPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map