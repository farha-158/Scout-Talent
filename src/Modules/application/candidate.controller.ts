import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiQuery, ApiSecurity } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { HiredDTO } from "./dto/hired.dto";
import { RejectDTO } from "./dto/reject.dto";
import { InterviewDTO } from "./dto/interview.dto";
import { JobOfferDTO } from "./dto/jobOffer.dto";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { CandidateStatus } from "../../Shared/Enums/candidateStatus.enum";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";
import { JobType, WorkMode } from "../../Shared/Enums/job.enum";
import { ApplicationService } from "./application.service";

@Controller("candidate")
export class CandidateController {
  constructor(
    private applicationService: ApplicationService,
  ) {}

  @Get("company/jobsApply")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  @ApiQuery({ name: "q", required: false, type: String })
  @ApiQuery({ name: "s", required: false, enum: CandidateStatus })
  public async GetAllJobsByCompanyApply(
    @currentUser() company: JwtPayloadType,
    @Query("q") q?: string,
    @Query("s") status?: CandidateStatus,
  ) {
    const data = await this.applicationService.GetAllJobsByCompanyApply(
      company.id,
      q,
      status,
    );
    return { data };
  }

  @Get("screening/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async screenCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const data = await this.applicationService.screeningCV(company.id, id);
    return { data };
  }

  @Post("reject/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async rejectedCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body: RejectDTO,
  ) {
    const data = await this.applicationService.rejectCV(company.id, id, body);
    return { data };
  }

  @Post("hire/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async hiredCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body: HiredDTO,
  ) {
    const data = await this.applicationService.hiredCV(company.id, id, body);
    return { data };
  }

  @Post("interview/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async interviewCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body: InterviewDTO,
  ) {
    const data = await this.applicationService.interviewCV(company.id, id, body);
    return { data };
  }

  @Post("offer/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async offerCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body: JobOfferDTO,
  ) {
    const data = await this.applicationService.jobOffer(company.id, id, body);
    return { data };
  }

  @Get("applicant/application")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "location", required: false, type: String })
  @ApiQuery({ name: "jobType", required: false, enum: JobType })
  @ApiQuery({ name: "workMode", required: false, enum: WorkMode })
  public async applicationByApplicant(
    @currentUser() user: JwtPayloadType,
    @Query("search") search?: string,
    @Query("location") location?: string,
    @Query("jobType") jobType?: JobType,
    @Query("workMode") workMode?: WorkMode,
  ) {
    const jobApply =
      await this.applicationService.alljobsApplicantionByApplicant(
        user.id,
        search,
        location,
        jobType,
        workMode,
      );
    return {
      data: jobApply,
    };
  }

  @Get("applicant/application/:id")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async applicationByApplicantByID(
    @currentUser() user: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const jobApply = await this.applicationService.jobApplicantionByUserByID(
      user.id,
      id,
    );

    return {
      data: jobApply,
    };
  }
}
