import { config } from 'dotenv';

config();

export default {
    CLIENT_ID: process.env.MAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.MAIL_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN,
    USER: process.env.MAIL_USER
} as const;