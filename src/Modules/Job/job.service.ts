import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { Repository } from "typeorm";
import { addJobDTO } from "./dto/addJob.dto";
import { UserService } from "../Users/user.service";
import { JobApplicant } from "./job_applicant.entity";
import { updateJobDTO } from "./dto/updateJob.dto";
import { CVService } from "../CV/cv.service";
import { CandidateStatus } from "src/utils/Enums/candidateStatus.enum";

@Injectable()
export class JobServices{
    constructor(
        @InjectRepository(Job) private jobRepository:Repository<Job>,
        @InjectRepository(JobApplicant) private jobApplicantRepository:Repository<JobApplicant>,
        private userService:UserService,
        private cvService:CVService
    ){}

    /**
     * to add new job
     * @param dto title , description , status ,deelline , salaryMin
     * @param recruiterId 
     * @returns messsage
     */
    public async Addjob(dto:addJobDTO, recruiterId : number){

        const {
            title , description , 
            status ,skills,
            location ,minSalary ,maxSalary ,requirements
            ,type, workMode, responsibilities }=dto

        const user= await this.userService.findUser(recruiterId)

        if(!user) throw new BadRequestException('please try again')

        const Njob = this.jobRepository.create({
            title , description , location,
            minSalary, maxSalary, status ,requirements,
            type,workMode , skills, responsibilities, company:user
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

    public async GetAllJobsByRecruiter(id:number){

        const recruiter= await this.userService.findUser(id)

        if(!recruiter) throw new BadRequestException('please try again') 

        const jobs = await this.jobRepository.find({
            where: { company: { id } }
        })
        return jobs
    }
    /**
     * get job's id
     * @param id 
     * @returns job
     */
    public async getJob(id:number){

        const job=await this.jobRepository.findOne({where:{id}})

        if (!job){
            throw new BadRequestException('not found job')
        }
        return job
    }


    public async updateJob(id:number,dto:updateJobDTO){
        const job=await this.jobRepository.findOne({where:{id}})

        if (!job){
            throw new BadRequestException('not found job')
        }

        await this.jobRepository.update(id,dto)
        
        return {message: "Job updated successfully"}
    }

    /**
     * delete job 
     * @param id 
     * @returns message
     */
    public async deleteJob(id : number){
        const job=await this.jobRepository.findOne({where:{id}})

        if (!job){
            throw new BadRequestException('not found job')
        }

        await this.jobRepository.remove(job)

        return {message: "Job deleted successfully"}
    }


    /**
     * application job
     * @param applicantId user
     * @param jobId job
     * @returns message
     */
    public async applyJob(applicantId:number,jobId:number, cvId:number){

        const user = await this.userService.findUser(applicantId)
        if(!user) throw new BadRequestException('please try again')

        const job = await this.jobRepository.findOne({where:{id:jobId}})
        if(!job) throw new BadRequestException('please try again')

        const cv = await this.cvService.findCV(cvId)
        if(!cv) throw new BadRequestException('try again')
        
        console.log(applicantId,jobId,cvId)
        const jobApp=this.jobApplicantRepository.create({applicant:user,job,cv})

        await this.jobApplicantRepository.save(jobApp)

        return {message: 'application the job successful'}
    }

    public async screeningCV(jobId:number){

        const jobApplicantion = await this.jobApplicantRepository.findOne({where:{job:{id:jobId}}})
        if(!jobApplicantion) throw new BadRequestException('please try again')
        
        jobApplicantion.status= CandidateStatus.SCREENING
        await this.jobApplicantRepository.save(jobApplicantion)

        return true
    }

    public async rejectCV(jobId:number){

        const jobApplicantion = await this.jobApplicantRepository.findOne({where:{job:{id:jobId}}})
        if(!jobApplicantion) throw new BadRequestException('please try again')
        
        jobApplicantion.status= CandidateStatus.REJECTED
        await this.jobApplicantRepository.save(jobApplicantion)

        return true
    }

    public async jobApplicantionByUser(userId:number){

        const jobsApplicantion = await this.jobApplicantRepository.find({where:{applicant:{id:userId}}})
        if(!jobsApplicantion) throw new BadRequestException('no job applicantion by this applicant')

        return jobsApplicantion
    }


    public async filterJobs( search: string ) {
        return this.jobRepository
            .createQueryBuilder("job")
            .where("LOWER(job.title) LIKE LOWER(:search)", { search: `%${search}%` })
            .orWhere("LOWER(job.skills) LIKE LOWER(:search)", { search: `%${search}%` })
            .getMany();
    }

    public async filterJobByStatus(status:CandidateStatus){

        const jobs= await this.jobApplicantRepository.find({where:{status}})

        return jobs
    }
}