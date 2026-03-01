import { SkillService } from "./skills.service";
import type { JwtPayloadType } from "src/utils/type";
import { addSkillDTO } from "./dto/addSkill.dto";
export declare class SkillController {
    private skillService;
    constructor(skillService: SkillService);
    addSkill(user: JwtPayloadType, body: addSkillDTO): Promise<{
        message: string;
    }>;
    deleteSkill(user: JwtPayloadType, id: number): Promise<{
        message: string;
    }>;
}
