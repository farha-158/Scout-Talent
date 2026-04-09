import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { addExperienceDTO } from "./dto/addExperience.dto";
import { updateExperienceDTO } from "./dto/updateExperience.dto";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { ApiSecurity } from "@nestjs/swagger";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";

@Controller("applicants/me")
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @Post("experiences")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async addExperience(
    @Body() body: addExperienceDTO,
    @currentUser() user: JwtPayloadType,
  ) {
    const data = await this.experienceService.addExperience(body, user.id);
    return { data };
  }

  @Patch("experiences/:id")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async updateExperience(
    @Body() body: updateExperienceDTO,
    @Param("id") id: string,
  ) {
    const data = await this.experienceService.updateExperience(body, id);
    return { data };
  }

  @Delete("experiences/:id")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async deleteExperience(@Param("id") id: string) {
    const data = await this.experienceService.deleteExperience(id);
    return { data };
  }
}
