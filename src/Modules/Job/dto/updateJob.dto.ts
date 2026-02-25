import { IsOptional } from "class-validator";
import { JobStatus ,JobType,WorkMode} from "src/utils/Enums/job.enum"


export class updateJobDTO{

    @IsOptional()
    title: string;

    @IsOptional()
    location: string;

    @IsOptional()
    minSalary: number;

    @IsOptional()
    maxSalary: number;

    @IsOptional()
    currency: string;

    @IsOptional()
    type: JobType;

    @IsOptional()
    status: JobStatus;

    @IsOptional()
    workMode: WorkMode;

    @IsOptional()
    description: string;

    @IsOptional()
    skills: string[];

    @IsOptional()
    responsibilities: string[];

    @IsOptional()
    requirements: string;
}