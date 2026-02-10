import { BadRequestException, Controller,  Param,  ParseIntPipe,  Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express} from 'express'
import { CVService } from "./cv.service";
import { Roles } from "../Users/decorator/user_role.decorator";
import { RoleUser } from "src/utils/Enums/user.enum";
import { AuthGuard } from "../Users/guard/AuthUser.guard";

@Controller()
export class CVController{
    constructor(private cvService:CVService){}

    // ~/api/cv/:userId
    @Post('cv/:userId')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('cv'))
    public async uploadCV(@Param('userId' , ParseIntPipe) id:number,@UploadedFile() file:Express.Multer.File){
        if(!file) throw new BadRequestException('no file upload')
        return await this.cvService.uploadCV(id,file.path)
    }
}