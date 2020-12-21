import { config } from 'dotenv';

config();

export default {
    ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET,
    GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET
} as const;