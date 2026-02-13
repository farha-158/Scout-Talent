import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { Repository } from "typeorm";
import { addJobDTO } from "./dto/addJob.dto";
import { UserService } from "../Users/user.service";
import { JobApplicant } from "./job_applicant.entity";

@Injectable()
export class JobServices{
    constructor(
        @InjectRepository(Job) private jobRepository:Repository<Job>,
        @InjectRepository(JobApplicant) private jobApplicantRepository:Repository<JobApplicant>,
        private userService:UserService
    ){}

    /**
     * to add new job
     * @param dto title , description , status ,deelline , salaryMin
     * @param recruiterId 
     * @returns messsage
     */
    public async Addjob(dto:addJobDTO, recruiterId : number){
        const {title , description , status ,deelline , salaryMin}=dto
        const user= await this.userService.findUser(recruiterId)
        if(!user) throw new BadRequestException('please try again')

        const Njob = this.jobRepository.create({
            title , description , status ,deelline , salaryMin , recruiter:user
        })

        await this.jobRepository.save(Njob)

        return {message:'add job successful'}
    }

    /**
     * get all job
     * @returns all jobs
     */
    public async getAllJob(){

        const jobs=await this.jobRepository.find()

        return jobs
    }

    /**
     * application job
     * @param applicantId user
     * @param jobId job
     * @returns message
     */
    public async applyJob(applicantId:number,jobId:number){

        const user = await this.userService.findUser(applicantId)
        if(!user) throw new BadRequestException('please try again')

        const job = await this.jobRepository.findOne({where:{id:jobId}})
        if(!job) throw new BadRequestException('please try again')

        const jobApp=this.jobApplicantRepository.create({applicant:user,job})

        await this.jobApplicantRepository.save(jobApp)

        return {message: 'application the job successful'}
    }
}