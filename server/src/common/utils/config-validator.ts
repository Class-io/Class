import { object, string, number } from 'joi';
import config from '../../config';
import { Constants } from '../constants';
import { Logger } from './logger';

export class ConfigValidator {
    public static async validate(): Promise<boolean> {
        try {
            const validationSchema = this._getValidationSchema();
            await validationSchema.validateAsync(config);

            return true;
        } catch(error) {
            this._printErrorMessage(error.message);
            return false;
        }
    }
    
    private static _getValidationSchema() {
        return object({
            APP: {
                MODE: string().valid(Constants.APP_MODE.DEV, Constants.APP_MODE.PROD, Constants.APP_MODE.TEST),
                PREFIX: string(),
                PORT: number().required()
            },
            AUTH: {
                ACCESS_TOKEN_SECRET: string().min(32),
                GOOGLE_CLIENT_ID: string().required(),
                GITHUB_CLIENT_ID: string().required(),
                GITHUB_CLIENT_SECRET: string().required()
            },
            CLOUDINARY: {
                CLOUD_NAME: string().required(),
                API_KEY: string().required(),
                API_SECRET: string().required()
            },
            DATABASE: {
                NAME: string(),
                URL: string().required()
            },
            MAIL: {
                CLIENT_ID: string().required(),
                CLIENT_SECRET: string().required(),
                REFRESH_TOKEN: string().required(),
                USER: string().email()
            }
        });
    }
    
    private static _printErrorMessage(message: string): void {
        Logger.red(`Environment variable error: ${message}`);
    }
}