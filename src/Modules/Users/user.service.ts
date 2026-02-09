import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { registerDTO } from "./dto/register.dto";
import bcrypt from 'bcrypt'
import { loginDTO } from "./dto/login.dto";
import { randomBytes } from 'node:crypto'
import { ConfigService } from "@nestjs/config";
import { MailService } from "../Mail/mail.service";
import { forgetPasswordDTO } from "./dto/forget_password.dto";
import { resetPasswordDTO } from "./dto/reset_password.dto";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User) 
        private userRepository : Repository<User>,
        private config: ConfigService,
        private mailService :MailService

    ){}

    public async register(dto:registerDTO){
        const {name , email , password , role} = dto

        const user = await this.userRepository.findOne({where:{email}})
        if(user) throw new BadRequestException('Email already in DB')
        
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const Suser = this.userRepository.create({
            name , email , password:hash , role,
            verificationToken:randomBytes(32).toString('hex')

        })

        const newuser=await this.userRepository.save(Suser)

        const link = `${this.config.get<string>('DOMIN')}/api/user/verify-email/${newuser.id}/${newuser.verificationToken}`

        await this.mailService.sendVerifyEmail(email,link)

        return {message:'verification email has been send , please check your email'}
    }

    public async login( dto:loginDTO){

        const {email , password} = dto

        const user = await this.userRepository.findOne({where:{email}})
        if(!user) throw new BadRequestException('Email not fond in DB ')

        const ckpass= await bcrypt.compare(password,user.password)
        if(!ckpass) throw new BadRequestException('password not correct')
        
        if(!user.isAccountVerified){

            if(user.verificationToken===null){
                user.verificationToken=randomBytes(32).toString('hex')
                await this.userRepository.save(user)
            }
            const link = `${this.config.get<string>('DOMIN')}/api/user/verify-email/${user.id}/${user.verificationToken}`
        
            await this.mailService.sendVerifyEmail(email,link)

            return {message:'verification email has been send , please check your email'}
        }
        return {message:'login successful'}
    }

    public async verifyEmail(id:number , verificationToken:string){

        const user = await this.userRepository.findOne({where:{id}})
        if(!user) throw new BadRequestException('user not found')
        
        if(user.verificationToken ===null) throw new BadRequestException('there is no verification token')
        if(user.verificationToken !== verificationToken) throw new BadRequestException(' invalid link')
    
        user.isAccountVerified = true
        user.verificationToken = ''

        await this.userRepository.save(user) 

        return{message:'your email has been verify , you can log in now'}

    }

    public async forgetPassword(dto:forgetPasswordDTO){
        const {email}=dto

        const user= await this.userRepository.findOne({where:{email}})

        if(!user) throw new BadRequestException('email not in DB')

        user.resetPasswordToken= randomBytes(32).toString('hex')

        await this.userRepository.save(user)

        const link = `${this.config.get<string>('DOMIN')}/api/user/reset_password/${user.id}/${user.resetPasswordToken}`
        
        await this.mailService.sendResetPassword(email,link)

        return{message:'check your email , click to link'}
    }

    public async resetPassword(dto:resetPasswordDTO , id:number, resetPasswordToken:string){
        const {newPassword} = dto
        const user= await this.userRepository.findOne({where:{id}})

        if (!user) throw new BadRequestException('please try again')
        
        if(user.resetPasswordToken==='') throw new BadRequestException('there is no verification token')

        if(user.resetPasswordToken!== resetPasswordToken) throw new BadRequestException('invalid link')

        const hashPassword= await bcrypt.hash(newPassword,10)

        user.password=hashPassword
        user.resetPasswordToken=''

        await this.userRepository.save(user)

        return {message :'password update successful'}
    }

    public async findUser(id:number){
        const user= await this.userRepository.findOne({where:{id}})
        return user
    }
}