import { Injectable } from "@nestjs/common";
import { Transporter, createTransport } from 'nodemailer';
import { logger } from '../../common/utils/logger';
import config from '../../config';

@Injectable()
export class MailService {
    private readonly _transporter: Transporter;

    constructor() {
        this._transporter = this._createTransporter();
        this._verifyTransporter();
    }

    public sendConfirmationCode(email: string, confirmationCode: string): void {
        this._transporter.sendMail({
            from: config.MAIL.USER,
            to: email,
            subject: 'Chat.io - Confirmation code',
            html: `<b>${confirmationCode}</b>`
        });
    }

    private _createTransporter(): Transporter {
        return createTransport({
            pool: true,
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: config.MAIL.USER,
                refreshToken: config.MAIL.REFRESH_TOKEN,
                clientId: config.MAIL.CLIENT_ID,
                clientSecret: config.MAIL.CLIENT_SECRET
            }
        });
    };

    private _verifyTransporter(): void {
        this._transporter.verify((error) => {
            if(error) {
                logger.red(error.message);
            }
        });
    }
}