import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../Users/user.entity";
import { JobApplicant } from "../Job/job_applicant.entity";

@Entity({ name: "CV" })
export class CV {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.Cvs)
  applicant: User;

  @OneToMany(() => JobApplicant, (app) => app.cv)
  applications: JobApplicant[];
}
