import { RoleUser } from "src/Shared/Enums/user.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "../Job/job.entity";
import { JobApplicant } from "../Job/job_applicant.entity";
import { CV } from "../CV/cv.entity";
import { SkillOrSpecializations } from "../Skills/skills.entity";
import { Experience } from "../Experience/experience.entity";
import { UserToken } from "./user-token.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  job_title: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  linkedIn_profile: string;

  @Column({ type: "enum", enum: RoleUser, default: RoleUser.APPLICANT })
  role: RoleUser;

  @Column({ nullable: true })
  About: string;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createAt: Date;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @OneToMany(() => CV, (cv) => cv.applicant)
  Cvs: CV[];

  @OneToMany(() => SkillOrSpecializations, (s) => s.userORcompany)
  skillsORspecializations: SkillOrSpecializations[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experience: Experience[];

  @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.applicant)
  jobApplicant: JobApplicant[];

  @OneToMany(()=>UserToken,(token)=>token.user)
  tokens:UserToken[]
}
