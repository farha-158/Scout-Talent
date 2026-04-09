import { Module } from "@nestjs/common";
import { UserCleanupService } from "./user-cleanup.job";
import { OutboxService } from "./outbox.job";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Modules/Users/user.entity";
import { Outbox } from "../Modules/Users/outbox.entity";
import { MailModule } from "../Shared/Mail/mail.module";


@Module({
  providers: [UserCleanupService, OutboxService],
  imports: [MailModule, TypeOrmModule.forFeature([User, Outbox])],
})
export class JobCornModule {}
