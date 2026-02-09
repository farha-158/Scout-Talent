import { BadRequestException, Controller,  Param,  ParseIntPipe,  Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express} from 'express'
import { CVService } from "./cv.service";
@Controller()
export class CVController{
    constructor(private cvService:CVService){}

    @Post('api/cv/:id')
    @UseInterceptors(FileInterceptor('cv'))
    public async uploadCV(@Param('id' , ParseIntPipe) id:number,@UploadedFile() file:Express.Multer.File){
        if(!file) throw new BadRequestException('no file upload')
        return await this.cvService.uploadCV(id,file.path)
    }
}