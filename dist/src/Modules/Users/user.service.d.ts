import { User } from "./user.entity";
import { Repository } from "typeorm";
import { JobApplicant } from "../Job/job_applicant.entity";
import { updateUserDTO } from "./dto/updateUser.dto";
import { updateoraddAboutDTO } from "./dto/update&addAbout.dto";
export declare class UserService {
    private userRepository;
    private jobApplicantRepository;
    constructor(userRepository: Repository<User>, jobApplicantRepository: Repository<JobApplicant>);
    findUser(id: number): Promise<User | null>;
    basicInformation(id: number): Promise<User | null>;
    updateProfile(dto: updateUserDTO, id: number): Promise<boolean>;
    addorupdateAbout(dto: updateoraddAboutDTO, id: number): Promise<string>;
    profileCompleteUser(id: number): Promise<{
        percentage: number;
        sections: {
            basicInfo: boolean;
            skillsCompleted: boolean;
            experienceCompleted: boolean;
        };
    }>;
    dashboardStatisticsUser(id: number): Promise<{
        totalApplicant: number;
        inReview: number;
        interview: number;
    }>;
    profileCompleteCompany(id: number): Promise<{
        percentage: number;
        sections: {
            basicInfo: boolean;
            AboutCompleted: boolean;
            specializationsCompleted: boolean;
        };
    }>;
    private getDateBeforeMonths;
}
