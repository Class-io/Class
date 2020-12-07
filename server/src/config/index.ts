import appConfig from './app';
import databaseConfig from './database';

export default {
    APP: appConfig,
    DATABASE: databaseConfig
} as const;