import { ExperienceService } from "./experience.service";
import { addExperienceDTO } from "./dto/addExperience.dto";
import type { JwtPayloadType } from "src/utils/type";
import { updateExperienceDTO } from "./dto/updateExperience.dto";
export declare class ExperienceController {
    private experienceService;
    constructor(experienceService: ExperienceService);
    addExperience(body: addExperienceDTO, user: JwtPayloadType): Promise<{
        message: string;
    }>;
    updateExperience(body: updateExperienceDTO, id: number): Promise<{
        message: string;
    }>;
    deleteExperience(id: number): Promise<{
        message: string;
    }>;
}
