import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { User } from "../src/Modules/Users/user.entity";
import { UserToken } from "../src/Modules/Users/user-token.entity";
import { Outbox } from "../src/Modules/Users/outbox.entity";
import { CV } from "../src/Modules/CV/cv.entity";
import { Job } from "../src/Modules/Job/job.entity";
import { JobApplicant } from "../src/Modules/application/job_applicant.entity";
import { Experience } from "../src/Modules/Experience/experience.entity";
import { JobOffer } from "../src/Modules/offer/jobOffer.entity";
import { Reject } from "../src/Modules/application/reject.entity";
import { Applicant } from "../src/Modules/applicant/applicant.entity";
import { Company } from "../src/Modules/company/company.entity";
import { Interview } from "../src/Modules/interview/interviews.entity";
import { FeedBack } from "../src/Modules/interview/feedback.entity";
import { CancelInterview } from "../src/Modules/interview/cancelInterview.entity";
import { Skill } from "../src/Modules/Skills/skills.entity";
import { Specializations } from "../src/Modules/specialization/specialization.entity";
import { HiredDetails } from "../src/Modules/application/Hired_Details.entity";

config({ path: ".env" });

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  entities: [
    User,
    UserToken,
    Outbox,
    CV,
    Job,
    JobApplicant,
    Experience,
    HiredDetails,
    JobOffer,
    Reject,
    Applicant,
    Company,
    Interview,
    FeedBack,
    CancelInterview,
    Skill,
    Specializations,
  ],
  migrations: ["dist/db/migrations/*.js"],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
