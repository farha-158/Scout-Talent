import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CV } from "./cv.entity";
import { Repository } from "typeorm";
import { UserService } from "../Users/user.service";
@Injectable()
export class CVService{
    constructor(
        @InjectRepository(CV) private cvRepository: Repository<CV>,
        private userService : UserService,

    ){}

    public async uploadCV(userId:string,fileUrl:string){

        const user= await this.userService.findUser(userId)

        if(!user) throw new BadRequestException('user not found')

        const cv= this.cvRepository.create({fileUrl,applicant:user})

        await this.cvRepository.save(cv)

        return {message:"cv upload successful" ,cvId:cv.id}
    }

    public async findCV(id:string){
        
        const cv =await this.cvRepository.findOne({where:{id}})

        return cv
    }
}