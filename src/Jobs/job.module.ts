import { Module } from "@nestjs/common";
import { UserCleanupService } from "./user-cleanup.job";
import { OutboxService } from "./outbox.job";
import { MailModule } from "src/Shared/Mail/mail.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Modules/Users/user.entity";
import { Outbox } from "src/Modules/Users/outbox.entity";

@Module({
  providers: [UserCleanupService, OutboxService],
  imports: [MailModule, TypeOrmModule.forFeature([User, Outbox])],
})
export class JobCornModule {}
