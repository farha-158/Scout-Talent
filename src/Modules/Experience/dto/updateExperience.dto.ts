import { IsOptional } from "class-validator"


export class updateExperienceDTO{

    @IsOptional()
    title:string

    @IsOptional()
    company:string

    @IsOptional()
    startDate:Date

    @IsOptional()
    endDate:Date

    @IsOptional()
    description:string
}