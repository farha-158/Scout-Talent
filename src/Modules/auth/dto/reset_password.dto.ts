import { IsString,Length } from "class-validator"


export class resetPasswordDTO{
    @IsString()
    @Length(6,15)
    newPassword:string

}