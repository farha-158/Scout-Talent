import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JobServices } from "./job.service";
import { Roles } from "src/Shared/decorator/user_role.decorator";
import { RoleUser } from "src/Shared/Enums/user.enum";
import { ApiQuery, ApiSecurity } from "@nestjs/swagger";
import { CandidateStatus } from "src/Shared/Enums/candidateStatus.enum";
import { currentUser } from "src/Shared/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/Shared/types/JwtPayloadType";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { HiredDTO } from "./dto/hired.dto";
import { RejectDTO } from "./dto/reject.dto";
import { InterviewDTO } from "./dto/interview.dto";
import { JobOfferDTO } from "./dto/jobOffer.dto";
import { JobType, WorkMode } from "src/Shared/Enums/job.enum";
import { offerRespones } from "./dto/offerRespones.dto";

@Controller("candidate")
export class CandidateController {
  constructor(private jobService: JobServices) {}

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
    const data = await this.jobService.GetAllJobsByCompanyApply(
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
    const data = await this.jobService.screeningCV(company.id, id);
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
    const data = await this.jobService.rejectCV(company.id, id, body);
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
    const data = await this.jobService.hiredCV(company.id, id, body);
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
    const data = await this.jobService.interviewCV(company.id, id, body);
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
    const data = await this.jobService.jobOffer(company.id, id, body);
    return { data };
  }

  @Get("applicant/jobsApply")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "location", required: false, type: String })
  @ApiQuery({ name: "jobType", required: false, enum: JobType })
  @ApiQuery({ name: "workMode", required: false, enum: WorkMode })
  public async applicantJobByApplicant(
    @currentUser() user: JwtPayloadType,
    @Query("search") search?: string,
    @Query("location") location?: string,
    @Query("jobType") jobType?: JobType,
    @Query("workMode") workMode?: WorkMode,
  ) {
    const jobApply = await this.jobService.alljobsApplicantionByUser(
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

  @Get("applicant/jobsApply/:id")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async applicantJobByApplicantByID(
    @currentUser() user: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const jobApply = await this.jobService.jobApplicantionByUserByID(
      user.id,
      id,
    );

    return {
      data: jobApply,
    };
  }

  @Patch("offer/response/:offerId")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async offerRespones(
    @Param("offerId") offerId: string,
    @currentUser() user: JwtPayloadType,
    @Body() body: offerRespones,
  ) {
    return this.jobService.jobOfferRespones(user.id, offerId, body);
  }
}
