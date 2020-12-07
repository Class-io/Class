import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix(config.APP.PREFIX);
  
  await app.listen(config.APP.PORT);
}

bootstrap();