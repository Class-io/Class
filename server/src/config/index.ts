import appConfig from './app';
import databaseConfig from './database';
import authConfig from './auth';

export default {
    APP: appConfig,
    AUTH: authConfig,
    DATABASE: databaseConfig
} as const;