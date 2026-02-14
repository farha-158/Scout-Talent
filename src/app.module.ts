import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Module} from '@nestjs/common'
import { User } from './Modules/Users/user.entity';
import { UserModule } from './Modules/Users/user.module';
import { MailModule } from './Modules/Mail/mail.module';
import { CV } from './Modules/CV/cv.entity';
import { CVModule } from './Modules/CV/cv.module';
import { Job } from './Modules/Job/job.entity';
import { JobModule } from './Modules/Job/job.module';
import { JobApplicant } from './Modules/Job/job_applicant.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    CVModule,
    JobModule,
    MailModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          type:'postgres',
          host:config.get<string>('DB_HOST'),
          port:Number(config.get<string>('PORT')),
          username:config.get<string>('DB_USERNAME'),
          password:config.get<string>('PASSWORD'),
          database:config.get<string>('DB_NAME'),

          synchronize:process.env.NODE_ENV !== 'production',
          entities:[ User , CV ,Job ,JobApplicant ]
        }
      }
      
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    ThrottlerModule.forRoot([
      {
        ttl:60000,
        limit:10
      }
    ])
  ]

})
export class AppModule {}
