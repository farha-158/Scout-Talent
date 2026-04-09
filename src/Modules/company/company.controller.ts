import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { ApiQuery, ApiSecurity } from "@nestjs/swagger";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { CompanyService } from "./company.service";
import { updateCompanyDTO } from "./dto/updateCompany.dto";
import { updateoraddAboutDTO } from "./dto/about.dto";
import type { Response } from "express";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";
import { JobStatus } from "../../Shared/Enums/job.enum";

@Controller("company/me")
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get("")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async GetProfile(@currentUser() company: JwtPayloadType) {
    const me = await this.companyService.findCompanywithDetails(company.id);
    return {
      data: me,
    };
  }

  @Get("basic_info")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async GetBasicInfo(@currentUser() payload: JwtPayloadType) {
    const company = await this.companyService.basicInformation(payload.id);
    return {
      data: company,
    };
  }

  @Patch("basic_info")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async updateBasicInfo(
    @currentUser() payload: JwtPayloadType,
    @Body() body: updateCompanyDTO,
  ) {
    await this.companyService.updateProfile(body, payload.id);

    return {
      data: true,
    };
  }

  @Post("about")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async AboutCompany(
    @currentUser() company: JwtPayloadType,
    @Body() body: updateoraddAboutDTO,
  ) {
    const data = await this.companyService.addorupdateAbout(body, company.id);

    return {
      data,
    };
  }

  @Get("completion")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async profileCompleteCompany(@currentUser() company: JwtPayloadType) {
    const data = await this.companyService.profileCompleteCompany(company.id);
    return {
      data,
    };
  }

  @Get("dashboard-stats")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async dashboardStatistics(@currentUser() company: JwtPayloadType) {
    const data = await this.companyService.dashboardStatisticsCompany(
      company.id,
    );
    return {
      data,
    };
  }

  @Get("jobs")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  @ApiQuery({ name: "q", required: false, enum: JobStatus })
  public async GetAllJobsByCompany(
    @currentUser() company: JwtPayloadType,
    @Query("q") q?: JobStatus,
  ) {
    const data = await this.companyService.GetAllJobsByCompany(company.id, q);
    return { data };
  }

  @Delete("detele")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async deleteAccount(
    @currentUser() user: JwtPayloadType,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.companyService.deleteAccount(user.id);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return { data };
  }
}
