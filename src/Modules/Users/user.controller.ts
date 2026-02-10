import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { registerDTO } from "./dto/register.dto";
import { loginDTO } from "./dto/login.dto";
import { forgetPasswordDTO } from "./dto/forget_password.dto";
import { resetPasswordDTO } from "./dto/reset_password.dto";


@Controller()
export class UserController{
    constructor(
        private userService : UserService
    ){}

    @Post('register')
    public async register(@Body() body:registerDTO){
        const response=await this.userService.register(body)
        return response
    }

    @Post('login')
    public async login(@Body() body:loginDTO){
        const response= await this.userService.login(body)
        return response
    }

    @Get('user/verify-email/:id/:verificationToken')
    public async verifyEmail(
        @Param('id' , ParseIntPipe) id :number ,
        @Param('verificationToken') verificationToken:string
    ){
        return await this.userService.verifyEmail(id,verificationToken)
    }

    @Post('user/forget-password')
    public async forgetPassword(@Body() body:forgetPasswordDTO){
        return await this.userService.forgetPassword(body)
    }

    @Post('user/reset_password/:id/:resetPasswordToken')
    public async resetPassword(
        @Param('resetPasswordToken') resetPasswordToken:string ,
        @Param('id', ParseIntPipe) id : number,
        @Body() body : resetPasswordDTO
    ){
        return await this.userService.resetPassword(body ,id,resetPasswordToken)
    }
}