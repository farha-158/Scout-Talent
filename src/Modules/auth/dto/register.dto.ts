import { RoleUser } from "src/utils/Enums/user.enum"
import { IsString , IsEmail , IsNotEmpty , Length} from 'class-validator'

export class registerDTO{
    @IsString()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @Length(6,15)
    password:string

    @IsString()
    phone:string

    @IsString()
    job_title:string

    @IsString()
    location:string

    linkedIn_profile:string

    @IsString()
    @IsNotEmpty()
    role:RoleUser
}