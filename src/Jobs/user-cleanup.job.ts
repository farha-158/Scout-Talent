import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Modules/Users/user.entity";
import { daysToMilliseconds } from "src/Shared/utils/cookie.util";
import { Repository } from "typeorm";

@Injectable()
export class UserCleanupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async deleteUnVerifyEmail() {
    const fifteenDays = new Date(Date.now() - daysToMilliseconds(15));

    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("isEmailVerified= :isVerify", { isVerify: true })
      .andWhere("createAt < :data", { data: fifteenDays })
      .execute();
  }
}
