import { EVENT_TYPE, STATUS } from "src/Shared/Enums/outbox.enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "outbox" })
export class Outbox {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: EVENT_TYPE })
  event_type: EVENT_TYPE;

  @Column({ type: "jsonb" })
  payload: {
    email:string,
    token:string
  };

  @Column({ type: "enum", enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  @Column({ default: 0 })
  retryCount: number;

  @Column({ type: "timestamptz" })
  nextRetryAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updated_at: Date;
}
