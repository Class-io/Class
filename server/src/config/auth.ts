import { config } from 'dotenv';

config();

export default {
    ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET
} as const;