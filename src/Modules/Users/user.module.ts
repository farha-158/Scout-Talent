import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MailModule } from "../Mail/mail.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { StringValue } from 'ms'
@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:
    [
        MailModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>{
                return{
                    global:true,
                    secret:config.get<string>('JWT_SECRET'),
                    signOptions:{
                        expiresIn:config.get<string>('JWT_EXPIRES_IN') as StringValue
                    }
                }
            }
        })
    ],
    exports:[UserService]
})

export class UserModule{}