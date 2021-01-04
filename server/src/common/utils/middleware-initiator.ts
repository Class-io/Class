import { INestApplication } from "@nestjs/common";
import { ExceptionMiddleware } from "../middlewares/exception.middleware";
import * as cookieParser from 'cookie-parser';
import * as cloudinary from 'cloudinary';
import { serve, setup } from 'swagger-ui-express';
import { load } from 'yamljs';
import { join } from 'path';
import config from '../../config';

export class MiddlewareInitiator {
    public static initiate(app: INestApplication): void {
        app.useGlobalFilters(new ExceptionMiddleware());

        app.use(cookieParser());

        this.createDocumentation(app);

        this.configureCloudinary();
    };

    private static createDocumentation(app: INestApplication): void {
        const swaggerDocs = load(join(__dirname, '/../../../swagger.yml'));
        app.use('/api-docs', serve, setup(swaggerDocs));
    }

    private static configureCloudinary(): void {
        cloudinary.v2.config({
            cloud_name: config.CLOUDINARY.CLOUD_NAME,
            api_key: config.CLOUDINARY.API_KEY,
            api_secret: config.CLOUDINARY.API_SECRET
        });
    }
}