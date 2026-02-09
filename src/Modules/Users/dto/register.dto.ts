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
    @IsNotEmpty()
    role:RoleUser
}