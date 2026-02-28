import { Module } from "@nestjs/common";
import { SkillController } from "./skills.controller";
import { SkillService } from "./skills.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillOrSpecializations } from "./skills.entity";
import { UserModule } from "../Users/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers:[SkillController],
    providers:[SkillService],
    imports:[
        UserModule,
        JwtModule,
        TypeOrmModule.forFeature([SkillOrSpecializations])
    ]
})
export class SkillModule{}