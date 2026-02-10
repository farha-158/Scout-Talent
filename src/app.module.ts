import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Module} from '@nestjs/common'
import { User } from './Modules/Users/user.entity';
import { UserModule } from './Modules/Users/user.module';
import { MailModule } from './Modules/Mail/mail.module';
import { CV } from './Modules/CV/cv.entity';
import { CVModule } from './Modules/CV/cv.module';
import { Job } from './Modules/Job/job.entity';

@Module({
  imports: [
    UserModule,
    CVModule,
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
          entities:[ User , CV ,Job]
        }
      }
      
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    MailModule
  ]

})
export class AppModule {}
