import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobController } from "./job.controller";
import { JwtModule } from "@nestjs/jwt";
import { JobService } from "./job.service";
import { forwardRef, Module } from "@nestjs/common";
import { CompanyModule } from "../company/company.module";
import { UserModule } from "../Users/user.module";

@Module({
  providers: [JobService],
  imports: [
    UserModule,
    forwardRef(() => CompanyModule),
    JwtModule,
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [JobController],

  exports: [JobService],
})
export class JobModule {}
