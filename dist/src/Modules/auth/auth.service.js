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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../Users/user.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const mail_service_1 = require("../Mail/mail.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_crypto_1 = require("node:crypto");
let AuthService = class AuthService {
    userRepository;
    config;
    mailService;
    jwtService;
    constructor(userRepository, config, mailService, jwtService) {
        this.userRepository = userRepository;
        this.config = config;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const { name, email, password, linkedIn_profile, phone, location, job_title, role } = dto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user)
            throw new common_1.BadRequestException('Email already in DB');
        const saltOrRounds = 10;
        const hash = await bcrypt_1.default.hash(password, saltOrRounds);
        const Suser = this.userRepository.create({
            name, email, password: hash, role, phone,
            linkedIn_profile, location, job_title,
            verificationToken: (0, node_crypto_1.randomBytes)(32).toString('hex')
        });
        const newuser = await this.userRepository.save(Suser);
        const link = `${this.config.get('DOMIN')}/api/user/verify-email/${newuser.id}/${newuser.verificationToken}`;
        await this.mailService.sendVerifyEmail(email, link);
        return { message: 'verification email has been send , please check your email' };
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('Email not found in DB ');
        const ckpass = await bcrypt_1.default.compare(password, user.password);
        if (!ckpass)
            throw new common_1.BadRequestException('password not correct');
        if (!user.isAccountVerified) {
            throw new common_1.BadRequestException('not verify your email');
        }
        const payload = { id: user.id, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_Refresh_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN')
        });
        const HrefreshToken = await bcrypt_1.default.hash(refreshToken, 10);
        user.refreshToken = HrefreshToken;
        await this.userRepository.save(user);
        return { message: 'login successful', accessToken, refreshToken };
    }
    async getAccessToken(refreshToken) {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.config.get('JWT_Refresh_SECRET'),
        });
        const user = await this.userRepository.findOne({ where: { id: payload.id } });
        if (!user || !user.refreshToken)
            throw new common_1.BadRequestException('Access denied');
        const isMatch = await bcrypt_1.default.compare(refreshToken, user.refreshToken);
        if (!isMatch)
            throw new common_1.BadRequestException('Invalid refresh token');
        const newAccessToken = await this.jwtService.signAsync({ id: user.id, role: user.role });
        return { accessToken: newAccessToken };
    }
    async logOut(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException('not found user');
        user.refreshToken = '';
        await this.userRepository.save(user);
        return true;
    }
    async verifyEmail(id, verificationToken) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException('user not found');
        if (user.verificationToken === null)
            throw new common_1.BadRequestException('there is no verification token');
        if (user.verificationToken !== verificationToken)
            throw new common_1.BadRequestException(' invalid link');
        user.isAccountVerified = true;
        user.verificationToken = '';
        await this.userRepository.save(user);
        return { message: 'your email has been verify , you can log in now' };
    }
    async forgetPassword(dto) {
        const { email } = dto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('email not in DB');
        user.resetPasswordToken = (0, node_crypto_1.randomBytes)(32).toString('hex');
        await this.userRepository.save(user);
        const link = `${this.config.get('DOMIN')}/api/user/reset_password/${user.id}/${user.resetPasswordToken}`;
        await this.mailService.sendResetPassword(email, link);
        return { message: 'check your email , click to link' };
    }
    async resetPassword(dto, id, resetPasswordToken) {
        const { newPassword } = dto;
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException('please try again');
        if (user.resetPasswordToken === '')
            throw new common_1.BadRequestException('there is no verification token');
        if (user.resetPasswordToken !== resetPasswordToken)
            throw new common_1.BadRequestException('invalid link');
        const hashPassword = await bcrypt_1.default.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetPasswordToken = '';
        await this.userRepository.save(user);
        return { message: 'password update successful' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map