import { INestApplication } from "@nestjs/common";
import { ExceptionMiddleware } from "../middlewares/exception.middleware";
import * as cookieParser from 'cookie-parser';

export class MiddlewareInitiator {
    public static initiate(app: INestApplication): void {
        app.useGlobalFilters(new ExceptionMiddleware());
        app.use(cookieParser());
    };
}