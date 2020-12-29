import { INestApplication } from "@nestjs/common";
import { ExceptionMiddleware } from "../middlewares/exception.middleware";
import * as cookieParser from 'cookie-parser';
import { serve, setup } from 'swagger-ui-express';
import { load } from 'yamljs';
import { join } from 'path';

export class MiddlewareInitiator {
    public static initiate(app: INestApplication): void {
        app.useGlobalFilters(new ExceptionMiddleware());

        app.use(cookieParser());

        this.createDocumentation(app);
    };

    private static createDocumentation(app: INestApplication): void {
        const swaggerDocs = load(join(__dirname, '/../../../swagger.yml'));
        app.use('/api-docs', serve, setup(swaggerDocs));
    }
}