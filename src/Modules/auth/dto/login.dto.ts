import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString , IsEmail , IsNotEmpty , Length, IsBoolean} from 'class-validator'

export class loginDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string

    @IsString()
    @Length(6,15)
    @ApiProperty()
    password:string

    @IsBoolean()
    @ApiPropertyOptional()
    rememberMe?: boolean;
}