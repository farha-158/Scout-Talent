import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserToken } from "./user-token.entity";
import { RoleUser } from "../../Shared/Enums/user.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  linkedIn_profile!: string;

  @Column({ type: "enum", enum: RoleUser, default: RoleUser.APPLICANT })
  role!: RoleUser;

  @Column({ nullable: true, select: false })
  refreshToken?: string;

  @Column({ default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isDelete?: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createAt!: Date;

  @OneToMany(()=>UserToken,(token)=>token.user)
  tokens!:UserToken[]
}
