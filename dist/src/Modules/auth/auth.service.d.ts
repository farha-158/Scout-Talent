import { User } from "../Users/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { MailService } from "../Mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { registerDTO } from "./dto/register.dto";
import { loginDTO } from "./dto/login.dto";
import { forgetPasswordDTO } from "./dto/forget_password.dto";
import { resetPasswordDTO } from "./dto/reset_password.dto";
export declare class AuthService {
    private userRepository;
    private config;
    private mailService;
    private jwtService;
    constructor(userRepository: Repository<User>, config: ConfigService, mailService: MailService, jwtService: JwtService);
    register(dto: registerDTO): Promise<{
        message: string;
    }>;
    login(dto: loginDTO): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
    getAccessToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logOut(id: number): Promise<boolean>;
    verifyEmail(id: number, verificationToken: string): Promise<{
        message: string;
    }>;
    forgetPassword(dto: forgetPasswordDTO): Promise<{
        message: string;
    }>;
    resetPassword(dto: resetPasswordDTO, id: number, resetPasswordToken: string): Promise<{
        message: string;
    }>;
}
