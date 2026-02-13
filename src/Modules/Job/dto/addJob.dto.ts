import { IsString } from "class-validator"
import { JobStatus } from "src/utils/Enums/job.enum"


export class addJobDTO{
    @IsString()
    title:string

    @IsString()
    description:string

    @IsString()
    status:JobStatus

    deelline:Date
    
    salaryMin:number
}