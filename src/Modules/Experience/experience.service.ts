import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Experience } from "./experience.entity";
import { Repository } from "typeorm";
import { addExperienceDTO } from "./dto/addExperience.dto";
import { UserService } from "../Users/user.service";
import { updateExperienceDTO } from "./dto/updateExperience.dto";


@Injectable()
export class ExperienceService{

    constructor(
        @InjectRepository(Experience) private experienceRepository:Repository<Experience>,
        private userService:UserService
    ){}

    public async addExperience(dto:addExperienceDTO,userId:number) {

        const { title, description, startDate, endDate, company } = dto

        const user = await this.userService.findUser(userId)
        if(!user)throw new BadRequestException('not user found')

        const nExper= this.experienceRepository.create({ 
            title, description, startDate, endDate, company, user
        })

        await this.experienceRepository.save(nExper)

        return { message: 'add experience successful'}
    }

    public async updateExperience(dto:updateExperienceDTO,id:number) {

        const experience= await this.experienceRepository.findOne({where:{id}})

        if(!experience) throw new BadRequestException('no experience found')

        await this.experienceRepository.update(id,dto)

        return { message: 'update experience successful'}
    }

    public async deleteExperience(id:number) {

        const experience= await this.experienceRepository.findOne({where:{id}})

        if(!experience) throw new BadRequestException('no experience found')

        await this.experienceRepository.delete(id)

        return { message: 'delete experience successful'}
    }
}