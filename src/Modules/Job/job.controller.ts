import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { JobServices } from "./job.service";
import { addJobDTO } from "./dto/addJob.dto";

@Controller()
export class JobController{
    constructor(private jobService : JobServices){}

    @Post('createJob/:id')
    public async CreateJob(@Body() body:addJobDTO, @Param('id' , ParseIntPipe) id:number ){
        return await this.jobService.Addjob(body,id)
    }

    @Get('allJob')
    public async GetAllJob(){
        return await this.jobService.getAllJob()
    }

    @Get('applyJob/:applicantId/:jobId')
    public async applyJob(@Param('applicantId',ParseIntPipe) applicantId:number, @Param('jobId',ParseIntPipe) jobId:number){
        return await this.jobService.applyJob(applicantId,jobId)
    }
}