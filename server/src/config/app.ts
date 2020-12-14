import { config } from 'dotenv';

config();

export default {
    MODE: process.env.APP_MODE,
    PREFIX: process.env.APP_PREFIX || '/',
    PORT: parseInt(process.env.PORT || process.env.APP_PORT),
} as const;