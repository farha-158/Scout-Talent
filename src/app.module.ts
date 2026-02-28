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
import { SkillOrSpecializations } from './Modules/Skills/skills.entity';
import { SkillModule } from './Modules/Skills/skills.module';
import { Experience } from './Modules/Experience/experience.entity';
import { ExperienceModule } from './Modules/Experience/experience.module';
import { AuthModule } from './Modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    CVModule,
    JobModule,
    SkillModule,
    ExperienceModule,
    MailModule,
    AuthModule,
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
          entities:[ User , CV ,Job ,JobApplicant ,SkillOrSpecializations , Experience]
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
