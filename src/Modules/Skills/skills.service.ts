import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "./skills.entity";
import { Repository } from "typeorm";
import { addSkillDTO } from "./dto/addSkill.dto";
import { UserService } from "../Users/user.service";


@Injectable()
export class SkillService{

    constructor(
        @InjectRepository(Skill) private skillRepository : Repository<Skill>,
        private userService:UserService

    ){}

    public async addSkill(dto:addSkillDTO ,userId:number){

        const {name}=dto

        const user = await this.userService.findUser(userId)
        if(!user)throw new BadRequestException('not user found')

        const skill = await this.skillRepository.findOne({where:{name}})
        if(skill) throw new BadRequestException('name of skill already in your skills')

        const NSkill=this.skillRepository.create({name ,user})

        await this.skillRepository.save(NSkill)

        return {message:'add skill successful'}
    }

    public async deleteSkill(id:number){

        const skill = await this.skillRepository.findOne({where:{id}})

        if(!skill) throw new BadRequestException('no found skill')

        await this.skillRepository.remove(skill)

        return {message:'skill delete successful'}
    }
}