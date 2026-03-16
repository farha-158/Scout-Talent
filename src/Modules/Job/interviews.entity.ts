import { CURRENT_TIMESTAMP } from "src/Shared/constants/variables";
import { InterviewTypes } from "src/Shared/Enums/InterviewTypes.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { JobApplicant } from "./job_applicant.entity";

@Entity("interviews")
export class Interview {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: InterviewTypes,
    default: InterviewTypes.TECHNICAL,
  })
  type: InterviewTypes;

  @Column({ type: "timestamp" })
  scheduledAt: Date;

  @Column()
  meetingLink: string;

  @CreateDateColumn({ type: "timestamp", default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @ManyToOne(() => JobApplicant, (application) => application.interviews)
  application: JobApplicant;
}
