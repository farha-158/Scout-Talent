import { Module } from "@nestjs/common";
import { SpecializationService } from "./specialization.service";
import { SpecializationController } from "./specialization.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Specializations } from "./specialization.entity";
import { CompanyModule } from "../company/company.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../Users/user.module";

@Module({
  providers: [SpecializationService],
  controllers: [SpecializationController],
  imports: [
    CompanyModule,
    JwtModule,
    UserModule,
    TypeOrmModule.forFeature([Specializations]),
  ],
})
export class SpecializationModule {

}
