import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { User } from "../Modules/Users/user.entity";
import { daysToMilliseconds } from "../Shared/utils/cookie.util";

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
      .where("isEmailVerified= :isVerify", { isVerify: false })
      .andWhere("createAt < :data", { data: fifteenDays })
      .execute();
  }
}
