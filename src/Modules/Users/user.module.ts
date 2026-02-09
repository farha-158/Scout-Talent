import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MailModule } from "../Mail/mail.module";

@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:
    [
        MailModule,
        TypeOrmModule.forFeature([User])
    ],
    exports:[UserService]
})

export class UserModule{}