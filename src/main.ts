import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(helmet())
  const swagger= new DocumentBuilder().setVersion('1.0').build()
  const document= SwaggerModule.createDocument(app,swagger)

  SwaggerModule.setup('swagger',app,document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();