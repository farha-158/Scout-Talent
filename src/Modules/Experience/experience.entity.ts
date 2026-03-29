import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../Users/user.entity";
@Entity({ name: "experience" })
export class Experience {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ type: "timestamptz" })
  startDate: Date;

  @Column({ type: "timestamptz" })
  endDate: Date;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.experience)
  user: User;
}
