import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigValidator } from './common/utils/config-validator';
import config from './config';

async function bootstrap() {
  if(!await ConfigValidator.validate()) return;
  
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix(config.APP.PREFIX);

  await app.listen(config.APP.PORT);
}

bootstrap();