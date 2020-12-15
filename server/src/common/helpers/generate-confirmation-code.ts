import { randomBytes } from 'crypto';

export function generateConfirmationCode(): string {
    return randomBytes(20).toString();
}