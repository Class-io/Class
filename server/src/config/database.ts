import { config } from 'dotenv';

config();

export default {
    NAME: process.env.DATABASE_NAME  || 'main',
    URL: process.env.DATABASE_URL
} as const;