import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../Users/user.entity";
import { Job } from "../Job/job.entity";
import { Specializations } from "../specialization/specialization.entity";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  About!: string;

  @OneToOne(() => User)
  @JoinTable()
  user!: User;

  @OneToMany(() => Job, (job) => job.company)
  jobs!: Job[];

  @OneToMany(() => Specializations, (s) => s.company)
  specialization!: Specializations[];
}
