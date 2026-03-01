import { RoleUser } from "src/utils/Enums/user.enum";
import { Job } from "../Job/job.entity";
import { JobApplicant } from "../Job/job_applicant.entity";
import { CV } from "../CV/cv.entity";
import { SkillOrSpecializations } from "../Skills/skills.entity";
import { Experience } from "../Experience/experience.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    job_title: string;
    location: string;
    linkedIn_profile: string;
    role: RoleUser;
    About: string;
    refreshToken: string;
    isAccountVerified: boolean;
    verificationToken: string;
    resetPasswordToken: string;
    createAt: Date;
    jobs: Job[];
    Cvs: CV[];
    skillsORspecializations: SkillOrSpecializations[];
    experience: Experience[];
    jobApplicant: JobApplicant[];
}
