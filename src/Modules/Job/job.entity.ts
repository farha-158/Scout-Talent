import { CURRENT_TIMESTAMP } from "src/utils/Constant/constant";
import { JobStatus } from "src/utils/Enums/job.enum";
import { Column, CreateDateColumn, Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { User } from "../Users/user.entity";
import { JobApplicant } from "./job_applicant.entity";

@Entity({name:'jobs'})
export class Job{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column({type:'enum' , enum:JobStatus})
    status:JobStatus

    @Column()
    deelline:Date

    @Column()
    salaryMin:number

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP})
    createdAt:Date

    @CreateDateColumn({type:'timestamp' , default:()=>CURRENT_TIMESTAMP , onUpdate:CURRENT_TIMESTAMP})
    updatedAt:Date

    @ManyToOne(()=>User,(user)=>user.jobs)
    recruiter:User

    @OneToMany(()=>JobApplicant,(jobApllicant)=>jobApllicant.applicant)
    applicants:JobApplicant[]

}