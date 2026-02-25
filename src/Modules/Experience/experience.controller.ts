import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ExperienceService } from "./experience.service";
import { Roles } from "../Users/decorator/user_role.decorator";
import { RoleUser } from "src/utils/Enums/user.enum";
import { AuthGuard } from "../Users/guard/AuthUser.guard";
import { addExperienceDTO } from "./dto/addExperience.dto";
import { currentUser } from "../Users/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/utils/type";
import { updateExperienceDTO } from "./dto/updateExperience.dto";


@Controller()
export class ExperienceController{

    constructor(
        private experienceService:ExperienceService
    ){}

    @Post('applicant/experiences')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async addExperience(
        @Body() body:addExperienceDTO,
        @currentUser() user : JwtPayloadType
    ){
        return await this.experienceService.addExperience(body,user.id)
    }

    @Put('applicant/experiences/:id')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async updateExperience(
        @Body() body:updateExperienceDTO ,
        @Param('id' , ParseIntPipe) id:number
    ){
        return await this.experienceService.updateExperience(body,id)
    }

    @Delete('applicant/experiences/:id')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async deleteExperience(@Param('id' , ParseIntPipe) id:number){
        return await this.experienceService.deleteExperience(id)
    }
}