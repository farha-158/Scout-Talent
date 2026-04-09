import { Module } from "@nestjs/common";
import { SkillController } from "./skills.controller";
import { SkillService } from "./skills.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Skill } from "./skills.entity";
import { JwtModule } from "@nestjs/jwt";
import { ApplicantModule } from "../applicant/applicant.module";
import { UserModule } from "../Users/user.module";

@Module({
  providers: [SkillService],
  controllers: [SkillController],
  imports: [
    UserModule,
    ApplicantModule,
    JwtModule,
    TypeOrmModule.forFeature([Skill]),
  ],
})
export class SkillModule {
}
