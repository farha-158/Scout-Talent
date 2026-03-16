import { CURRENT_TIMESTAMP } from "src/Shared/constants/variables";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobApplicant } from "./job_applicant.entity";

@Entity("hiredDetails")
export class HiredDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp" })
  startDate: Date;

  @CreateDateColumn({ type: "timestamp", default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @OneToOne(() => JobApplicant)
  @JoinColumn()
  application: JobApplicant;
}
