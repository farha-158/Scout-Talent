import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { JobStatus } from "../../../Shared/Enums/job.enum";

export class jobStatusDTO {

    @IsString()
    @ApiProperty()
    status!:JobStatus
}