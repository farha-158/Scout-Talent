import { Job } from "./job.entity";
import { User } from "../Users/user.entity";
import { CandidateStatus } from "src/utils/Enums/candidateStatus.enum";
import { CV } from "../CV/cv.entity";
export declare class JobApplicant {
    id: number;
    status: CandidateStatus;
    about: string;
    job: Job;
    applicant: User;
    cv: CV;
    createdAt: Date;
    hiredAt: Date;
}
