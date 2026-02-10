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
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadType } from "src/utils/type";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User) 
        private userRepository : Repository<User>,
        private config: ConfigService,
        private mailService :MailService,
        private jwtService:JwtService

    ){}

    /**
     * user register 
     * @param dto name , email, password, role
     * @returns message
     */
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

    /**
     * user login
     * @param dto email , password
     * @returns message
     */
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
        const payload:JwtPayloadType = {id:user.id ,role:user.role}

        const accessToken = await this.jwtService.signAsync(payload)
        
        return { message:'login successful', accessToken }
    }

    /**
     * to verify user's email
     * @param id user Id
     * @param verificationToken 
     * @returns message
     */
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

    /**
     * user forget password
     * @param dto email
     * @returns message
     */
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

    /**
     * update user's password
     * @param dto new password
     * @param id user id
     * @param resetPasswordToken 
     * @returns message
     */
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