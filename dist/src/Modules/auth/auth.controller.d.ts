import { AuthService } from "./auth.service";
import { registerDTO } from "./dto/register.dto";
import { loginDTO } from "./dto/login.dto";
import type { Response, Request } from "express";
import type { JwtPayloadType } from "src/utils/type";
import { forgetPasswordDTO } from "./dto/forget_password.dto";
import { resetPasswordDTO } from "./dto/reset_password.dto";
interface RequestWithCookies extends Request {
    cookies: {
        refreshToken?: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: registerDTO): Promise<{
        message: string;
    }>;
    login(res: Response, body: loginDTO): Promise<{
        message: string;
        accessToken: string;
    }>;
    getAccessToken(req: RequestWithCookies): Promise<{
        accessToken: string;
    }>;
    logOut(user: JwtPayloadType, res: Response): Promise<{
        msg: string;
    }>;
    verifyEmail(id: number, verificationToken: string): Promise<{
        message: string;
    }>;
    forgetPassword(body: forgetPasswordDTO): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordToken: string, id: number, body: resetPasswordDTO): Promise<{
        message: string;
    }>;
}
export {};
