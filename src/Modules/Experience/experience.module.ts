import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Experience } from "./experience.entity";
import { ExperienceController } from "./experience.controller";
import { ExperienceService } from "./experience.service";
import { JwtModule } from "@nestjs/jwt";
import { ApplicantModule } from "../applicant/applicant.module";
import { UserModule } from "../Users/user.module";

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService],
  imports: [
    UserModule,
    ApplicantModule ,
    JwtModule,
    TypeOrmModule.forFeature([Experience]),
  ],
})
export class ExperienceModule {}
