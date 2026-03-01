import { Experience } from "./experience.entity";
import { Repository } from "typeorm";
import { addExperienceDTO } from "./dto/addExperience.dto";
import { UserService } from "../Users/user.service";
import { updateExperienceDTO } from "./dto/updateExperience.dto";
export declare class ExperienceService {
    private experienceRepository;
    private userService;
    constructor(experienceRepository: Repository<Experience>, userService: UserService);
    addExperience(dto: addExperienceDTO, userId: number): Promise<{
        message: string;
    }>;
    updateExperience(dto: updateExperienceDTO, id: number): Promise<{
        message: string;
    }>;
    deleteExperience(id: number): Promise<{
        message: string;
    }>;
}
