import { object, string } from 'joi';

export const SendConfirmationMailValidationSchema = object({
    email: string().min(3).max(64).email().required()
});