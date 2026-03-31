import { ApiProperty } from "@nestjs/swagger";
import { IsEmail , IsNotEmpty} from "class-validator";

export class requestRestoreDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string
}