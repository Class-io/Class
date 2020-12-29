import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigValidator } from './common/utils/config-validator';
import { MiddlewareInitiator } from './common/utils/middleware-initiator';
import config from './config';

async function bootstrap() {
    if(!await ConfigValidator.validate()) return;
  
    const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix(config.APP.PREFIX);

    MiddlewareInitiator.initiate(app);

    await app.listen(config.APP.PORT);
}

bootstrap();