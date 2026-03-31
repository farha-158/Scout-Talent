import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserTokenType } from "src/Shared/Enums/UserToken.enum";

@Entity({ name: "user-token" })
export class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  token: string;

  @Column({ type: "timestamptz" })
  expiresAt: Date;

  @Column({ type: "enum", enum: UserTokenType })
  type: UserTokenType;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
