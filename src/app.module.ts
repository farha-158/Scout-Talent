import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Module} from '@nestjs/common'
import { User } from './Modules/Users/user.entity';
import { UserModule } from './Modules/Users/user.module';
import { MailModule } from './Modules/Mail/mail.module';
import { CV } from './Modules/CV/cv.entity';
import { CVModule } from './Modules/CV/cv.module';

@Module({
  imports: [
    UserModule,
    CVModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          type:'postgres',
          database:'scout_talent',
          password:config.get<string>('PASSWORD'),
          username:'postgres',
          port:5432,
          host:'localhost',
          synchronize:true,
          entities:[ User , CV ]
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
