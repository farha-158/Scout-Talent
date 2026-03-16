import { Body, Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JobServices } from "./job.service";
import { Roles } from "src/Shared/decorator/user_role.decorator";
import { RoleUser } from "src/Shared/Enums/user.enum";
import { ApiQuery, ApiSecurity } from "@nestjs/swagger";
import { CandidateStatus } from "src/Shared/Enums/candidateStatus.enum";
import { currentUser } from "src/Shared/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/Shared/types/JwtPayloadType";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { HiredDTO } from "./dto/hired.dto";

@Controller("candidate")
export class CandidateController {
  constructor(private jobService: JobServices) {}

  @Get("jobsApply")
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
    const data = await this.jobService.screeningCV(company.id,id);
    return { data };
  }

  @Get("reject/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async rejectedCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const data = await this.jobService.rejectCV(company.id, id);
    return { data };
  }

  @Get("hire/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async hiredCV(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body:HiredDTO
  ) {
    const data = await this.jobService.hiredCV(company.id, id ,body);
    return { data };
  }

}
