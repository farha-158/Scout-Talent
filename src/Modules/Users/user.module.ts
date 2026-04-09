import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { Outbox } from "./outbox.entity";
import { UserToken } from "./user-token.entity";
@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Outbox, UserToken]),
    JwtModule,
  ],
  exports: [UserService],
})
export class UserModule {}
