import { JobStatus, WorkMode, JobType } from "src/Shared/Enums/job.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../Users/user.entity";
import { JobApplicant } from "./job_applicant.entity";

@Entity({ name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  minSalary: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  maxSalary: number;

  // 📌 Type & Status
  @Column({ type: "enum", enum: JobType })
  type: JobType;

  @Column({ type: "enum", enum: JobStatus, default: JobStatus.DRAFT })
  status: JobStatus;

  @Column({ type: "enum", enum: WorkMode })
  workMode: WorkMode;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int" })
  positions: number;

  @Column({ type: "int", nullable: true })
  maxApplications: number;

  @Column({ type: "timestamptz" })
  deadline: Date;

  @Column("simple-array", { nullable: true })
  skills: string[];

  @Column("simple-array", { nullable: true })
  responsibilities: string[];

  @Column()
  requirements: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.jobs, { eager: true })
  company: User;

  @OneToMany(() => JobApplicant, (jobApllicant) => jobApllicant.applicant)
  applicants: JobApplicant[];
}
