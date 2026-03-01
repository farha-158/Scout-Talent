import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    private mailservice;
    constructor(mailservice: MailerService);
    sendVerifyEmail(email: string, link: string): Promise<void>;
    sendResetPassword(email: string, link: string): Promise<void>;
}
