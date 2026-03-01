import { Repository } from "typeorm";
import { addSkillDTO } from "./dto/addSkill.dto";
import { UserService } from "../Users/user.service";
import { SkillOrSpecializations } from "./skills.entity";
export declare class SkillService {
    private skillRepository;
    private userService;
    constructor(skillRepository: Repository<SkillOrSpecializations>, userService: UserService);
    addSkill(dto: addSkillDTO, Id: number): Promise<{
        message: string;
    }>;
    deleteSkill(id: number, userId: number): Promise<{
        message: string;
    }>;
}
