import { INestApplication } from "@nestjs/common";
import { ExceptionMiddleware } from "../middlewares/exception.middleware";

export class MiddlewareInitiator {
    public static initiate(app: INestApplication): void {
        app.useGlobalFilters(new ExceptionMiddleware());
    };
}