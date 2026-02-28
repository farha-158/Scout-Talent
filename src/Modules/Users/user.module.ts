import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MailModule } from "../Mail/mail.module";
import { JobApplicant } from "../Job/job_applicant.entity";
import { JwtModule } from "@nestjs/jwt";
@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:
    [
        MailModule,
        TypeOrmModule.forFeature([User , JobApplicant]),
        JwtModule
    ],
    exports:[UserService]
})

export class UserModule{}