import { randomBytes } from 'crypto';
import { IConfirmationCode } from '../../database/models/user/interfaces/IConfirmationCode';
import { Constants } from '../constants';

export function generateConfirmationCode(): IConfirmationCode {
    return {
        code: randomBytes(20).toString('hex').substr(8, 6),
        expiresAt: Date.now() + Constants.TIME.MINUTES_30
    };
}