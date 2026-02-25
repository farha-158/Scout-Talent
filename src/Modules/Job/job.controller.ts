import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JobServices } from "./job.service";
import { addJobDTO } from "./dto/addJob.dto";
import { RoleUser } from "src/utils/Enums/user.enum";
import { Roles } from "../Users/decorator/user_role.decorator";
import { AuthGuard } from "../Users/guard/AuthUser.guard";
import { updateJobDTO } from "./dto/updateJob.dto";
import { currentUser } from "../Users/decorator/currentUser.decorator";
import type { JwtPayloadType } from "src/utils/type";
import { CandidateStatus } from "src/utils/Enums/candidateStatus.enum";

@Controller()
export class JobController{

    constructor(
        private jobService : JobServices
    ){}

    @Post('createJob')
    @Roles(RoleUser.COMPANY)
    @UseGuards(AuthGuard)
    public async CreateJob(
        @Body() body:addJobDTO, 
        @currentUser() user:JwtPayloadType 
    ){
        return await this.jobService.Addjob(body,user.id)
    }

    @Get('allJob')
    public async GetAllJobs(){
        return await this.jobService.getAllJob()
    }

    @Get('recruiter/jobs')
    @Roles(RoleUser.COMPANY)
    @UseGuards(AuthGuard)
    public async GetAllJobsByCompany(
        @currentUser() user: JwtPayloadType
    ){
        return await this.jobService.GetAllJobsByRecruiter(user.id)
    }

    @Get('jobs/:id')
    public async GetJob(
        @Param('id' , ParseIntPipe) id: number
    ){
        return await this.jobService.getJob(id)
    }

    @Get('applyJob/:jobId/:cvId')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async applyJob(
        @currentUser() user:JwtPayloadType, 
        @Param('jobId',ParseIntPipe) jobId:number,
        @Param('cvId',ParseIntPipe ) cvId:number
    ){
        return await this.jobService.applyJob(user.id ,jobId ,cvId)
    }

    @Delete('recruiter/jobs/:id')
    public async deleteJob(@Param('id',ParseIntPipe) id: number){
        return await this.jobService.deleteJob(id)
    }

    @Put('recruiter/jobs/:id')
    public async updateJob(
        @Param('id',ParseIntPipe) id: number,
        @Body() body:updateJobDTO
    ){
        return await this.jobService.updateJob(id,body)
    }

    @Get('screenCV/:jobId')
    public async screenCV(@Param('jobId',ParseIntPipe) id: number){

        return await this.jobService.screeningCV(id)
    }

    @Get('rejectedCV/:jobId')
    public async rejectedCV(@Param('jobId',ParseIntPipe) id: number){

        return await this.jobService.rejectCV(id)
    }

    @Get('applicantJobByApplicant')
    @Roles(RoleUser.APPLICANT)
    @UseGuards(AuthGuard)
    public async applicantJobByApplicant(@currentUser() user:JwtPayloadType){
        return await this.jobService.jobApplicantionByUser(user.id)
    }

    @Get('filter')
    public async filterJob(@Query('q') q:string){
        return await this.jobService.filterJobs(q)
    }

    @Get('filterStatus')
    public async filterJobByStatus(@Query('s') status:CandidateStatus){
        return await this.jobService.filterJobByStatus(status)
    }

}