import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { AuthGuard } from "../auth/guards/AuthUser.guard";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { ApiSecurity } from "@nestjs/swagger";
import { addSpecializationDTO } from "./dto/addSpecialization.dto";
import { SpecializationService } from "./specialization.service";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";

@Controller("companys/me")
export class SpecializationController {
  constructor(private specializationService: SpecializationService) {}

  @Post("specializations")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async addSpecializations(
    @currentUser() company: JwtPayloadType,
    @Body() body: addSpecializationDTO,
  ) {
    const data = await this.specializationService.addSpecialization(
      body,
      company.id,
    );
    return { data };
  }

  @Delete("specializations/:id")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async deletespecializations(
    @currentUser() company: JwtPayloadType,
    @Param("id") id: string,
  ) {
    const data = await this.specializationService.deleteSkill(id, company.id);
    return { data };
  }
}
