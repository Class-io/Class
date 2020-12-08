import { config } from 'dotenv';

config();

export default {
    SECRET: process.env.AUTH_SECRET
} as const;