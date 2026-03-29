import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../Users/user.entity";

@Entity({ name: "skills" })
export class SkillOrSpecializations {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamptz"})
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.skillsORspecializations)
  userORcompany: User;
}
