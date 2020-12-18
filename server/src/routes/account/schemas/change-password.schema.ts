import { object, string } from 'joi';

export const ConfirmEmailValidationSchema = object({
    password: string().min(3).max(64).required()
});