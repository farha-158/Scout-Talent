import { forwardRef, Module } from "@nestjs/common";
import { InterviewController } from "./interview.controller";
import { InterviewService } from "./interview.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interview } from "./interviews.entity";
import { FeedBack } from "./feedback.entity";
import { CancelInterview } from "./cancelInterview.entity";
import { ApplicationModule } from "../application/application.module";
import { JobModule } from "../Job/job.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../Users/user.module";

@Module({
  providers: [InterviewService],
  controllers: [InterviewController],

  imports: [
    forwardRef(() => JobModule),
    forwardRef(()=>ApplicationModule),
    JwtModule,
    UserModule,
    TypeOrmModule.forFeature([Interview, FeedBack, CancelInterview]),
  ],

  exports: [InterviewService],
})
export class InterviewModule {}
