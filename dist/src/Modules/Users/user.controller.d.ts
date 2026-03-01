import { UserService } from "./user.service";
import type { JwtPayloadType } from "src/utils/type";
import { updateUserDTO } from "./dto/updateUser.dto";
import { updateoraddAboutDTO } from "./dto/update&addAbout.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    GetProfile(user: JwtPayloadType): Promise<import("./user.entity").User | null>;
    GetBasicInfo(payload: JwtPayloadType): Promise<import("./user.entity").User | null>;
    updateBasicInfo(payload: JwtPayloadType, body: updateUserDTO): Promise<boolean>;
    AboutCompany(company: JwtPayloadType, body: updateoraddAboutDTO): Promise<string>;
    profileCompleteUser(user: JwtPayloadType): Promise<{
        percentage: number;
        sections: {
            basicInfo: boolean;
            skillsCompleted: boolean;
            experienceCompleted: boolean;
        };
    }>;
    dashboardStatistics(user: JwtPayloadType): Promise<{
        totalApplicant: number;
        inReview: number;
        interview: number;
    }>;
    profileCompleteCompany(company: JwtPayloadType): Promise<{
        percentage: number;
        sections: {
            basicInfo: boolean;
            AboutCompleted: boolean;
            specializationsCompleted: boolean;
        };
    }>;
}
