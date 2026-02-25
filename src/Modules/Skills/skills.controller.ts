import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { SkillService } from "./skills.service";
import { Roles } from "../Users/decorator/user_role.decorator";
import { RoleUser } from "src/utils/Enums/user.enum";
import { AuthGuard } from "../Users/guard/AuthUser.guard";
import { currentUser } from "../Users/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/utils/type";
import { addSkillDTO } from "./dto/addSkill.dto";

@Controller()
export class SkillController{

    constructor(
        private skillService:SkillService
    ){}

    @Post('applicant/skills')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async addSkill(@currentUser() user:JwtPayloadType,@Body() body:addSkillDTO){

        return await this.skillService.addSkill(body,user.id)
    }

    @Delete('applicant/skills/:id')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async deleteSkill(@Param('id',ParseIntPipe) id:number){

        return await this.skillService.deleteSkill(id)

    }
}