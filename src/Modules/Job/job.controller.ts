import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { addJobDTO } from "./dto/addJob.dto";
import { updateJobDTO } from "./dto/updateJob.dto";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { jobStatusDTO } from "./dto/statusJob.dto";
import { ApiBody, ApiSecurity } from "@nestjs/swagger";
import { JobService } from "./job.service";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";
import { ApplicationService } from "../application/application.service";
import { applyJobDTO } from "../application/dto/applyJob.dto";

@Controller("jobs")
export class JobController {
  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
  ) {}

  @Post("create")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async CreateJob(
    @Body() body: addJobDTO,
    @currentUser() user: JwtPayloadType,
  ) {
    const data = await this.jobService.Addjob(body, user.id);
    return { data };
  }

  @Get("all")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async GetAllJobs() {
    const data = await this.jobService.getAllJob();
    return { data };
  }

  @Post("applyJob/:jobId/:cvId")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async applyJob(
    @currentUser() user: JwtPayloadType,
    @Param("jobId") jobId: string,
    @Param("cvId") cvId: string,
    @Body() body: applyJobDTO,
  ) {
    const data = await this.applicationService.applyJob(
      user.id,
      jobId,
      cvId,
      body,
    );
    return { data };
  }

  @Delete("/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async deleteJob(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const data = await this.jobService.deleteJob(company.id, id);
    return { data };
  }

  @Patch("/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  @ApiBody({ type: updateJobDTO })
  public async updateJob(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
    @Body() body: updateJobDTO,
  ) {
    const data = await this.jobService.updateJob(company.id, id, body);
    return { data };
  }

  @Post("/:jobId/status")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async jobStatusChanging(
    @currentUser() company: JwtPayloadType,
    @Param("jobId") jobId: string,
    @Body() body: jobStatusDTO,
  ) {
    const data = await this.jobService.ChangeJobStatus(company.id, jobId, body);
    return { data };
  }
}
