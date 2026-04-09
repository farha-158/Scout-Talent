import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { Roles } from "../../Shared/decorator/user_role.decorator";
import { RoleUser } from "../../Shared/Enums/user.enum";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity } from "@nestjs/swagger";
import { currentUser } from "../../Shared/decorator/currentUser.decorator";
import { JwtPayloadType } from "../../Shared/types/JwtPayloadType";
import { offerRespones } from "./dto/offerRespones.dto";

@Controller("offer")
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Patch("response/:offerId")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async offerRespones(
    @Param("offerId") offerId: string,
    @currentUser() user: JwtPayloadType,
    @Body() body: offerRespones,
  ) {
    return this.offerService.jobOfferRespones(user.id, offerId, body);
  }

  @Get("all/applicant")
  @Roles(RoleUser.APPLICANT)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async allOfferByApplicant(@currentUser() user: JwtPayloadType) {
    return this.offerService.allOfferByApplicant(user.id);
  }

  @Get("all/company")
  @Roles(RoleUser.COMPANY)
  @UseGuards(AuthGuard)
  @ApiSecurity("bearer")
  public async allOfferByCompany(@currentUser() user: JwtPayloadType) {
    return this.offerService.allOfferByCompany(user.id);
  }
}
