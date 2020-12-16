import appConfig from './app';
import databaseConfig from './database';
import authConfig from './auth';
import mailConfig from './mail';

export default {
    APP: appConfig,
    AUTH: authConfig,
    DATABASE: databaseConfig,
    MAIL: mailConfig
} as const;