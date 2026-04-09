import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../Users/user.entity";
import { CV } from "../CV/cv.entity";
import { Experience } from "../Experience/experience.entity";
import { JobApplicant } from "../application/job_applicant.entity";
import { Skill } from "../Skills/skills.entity";

@Entity("applicant")
export class Applicant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  job_title!: string;

  @OneToOne(() => User)
  @JoinTable()
  user!: User;

  @OneToMany(() => CV, (cv) => cv.applicant)
  Cvs!: CV[];

  @OneToMany(() => Experience, (experience) => experience.applicant)
  experiences!: Experience[];

  @OneToMany(() => Skill, (s) => s.applicant)
  skills!: Skill[];

  @OneToMany(() => JobApplicant, (jobApplicant) => jobApplicant.applicant)
  applications!: JobApplicant[];
}
