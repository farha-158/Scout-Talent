import { IsString , IsEmail , IsNotEmpty , Length} from 'class-validator'

export class loginDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @Length(6,15)
    password:string
}