import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { User } from "../Users/user.entity";
import { JobStatus } from "src/utils/Enums/job.enum";
import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";


@Entity({name:'job_applicant'})
export class JobApplicant{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Job,(job)=>job.applicants)
    job:Job

    @ManyToOne(()=>User,(user)=>user.jobApplicant)
    applicant:User

    @Column({type:'enum',enum:JobStatus , default:JobStatus.DRAFT})
    status:JobStatus

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date

}