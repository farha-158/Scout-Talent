import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express} from 'express'
import { CVService } from "./cv.service";
import { Roles } from "../Users/decorator/user_role.decorator";
import { RoleUser } from "src/utils/Enums/user.enum";
import { AuthGuard } from "../Users/guard/AuthUser.guard";
import { currentUser } from "../Users/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/utils/type";

@Controller()
export class CVController{

    constructor(private cvService:CVService){}

    @Post('/files/upload-cv')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('cv'))
    public async uploadCV(
        @currentUser() user : JwtPayloadType,
        @UploadedFile() file:Express.Multer.File
    ){
        if(!file) throw new BadRequestException('no file upload')
            
        return await this.cvService.uploadCV(user.id,file.path)
    }
}