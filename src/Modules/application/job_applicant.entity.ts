import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { Job } from "../Job/job.entity";
import { CV } from "../CV/cv.entity";
import { JobOffer } from "../offer/jobOffer.entity";
import { Reject } from "./reject.entity";
import { Applicant } from "../applicant/applicant.entity";
import { Interview } from "../interview/interviews.entity";
import { CandidateStatus } from "../../Shared/Enums/candidateStatus.enum";
import { HiredDetails } from "./Hired_Details.entity";

@Entity({ name: "job_applicant" })
@Unique(["job", "applicant"])
export class JobApplicant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: CandidateStatus, default: CandidateStatus.NEW })
  status!: CandidateStatus;

  @Column()
  about!: string;

  @ManyToOne(() => Job, (job) => job.applications)
  job!: Job;

  @ManyToOne(() => Applicant, (app) => app.applications)
  applicant!: Applicant;

  @ManyToOne(() => CV, (cv) => cv.applications)
  cv!: CV;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @OneToOne(() => HiredDetails, (details) => details.application)
  hiredDetails!: HiredDetails;

  @Column({ type: "timestamptz", nullable: true, default: null })
  hiredAt!: Date;

  @Column({ type: "timestamptz", nullable: true, default: null })
  screenAt!: Date;

  @OneToOne(() => JobOffer, (offer) => offer.application)
  offer!: JobOffer;

  @Column({ type: "timestamptz", nullable: true, default: null })
  sendOfferAt!: Date;

  @OneToMany(() => Interview, (interview) => interview.application)
  interviews!: Interview[];

  @Column({ type: "timestamptz", nullable: true, default: null })
  interviewAt!: Date;

  @OneToOne(() => Reject, (reject) => reject.application)
  reject!: Reject;

  @Column({ type: "timestamptz", nullable: true, default: null })
  rejectAt!: Date;
}
