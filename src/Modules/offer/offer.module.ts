import { forwardRef, Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobOffer } from "./jobOffer.entity";
import { UserModule } from "../Users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ApplicationModule } from "../application/application.module";

@Module({
  providers: [OfferService],
  controllers: [OfferController],
  imports: [
    forwardRef(() => ApplicationModule),
    UserModule,
    JwtModule,
    TypeOrmModule.forFeature([JobOffer]),
  ],
  exports: [OfferService],
})
export class OfferModule {}
