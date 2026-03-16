import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class HiredDTO {

    @IsString()
    @ApiProperty()
    startDate:string
}