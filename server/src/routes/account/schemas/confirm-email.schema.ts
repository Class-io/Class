import { object, string } from 'joi';

export const ConfirmEmailValidationSchema = object({
    email: string().min(3).max(64).email().required(),
    code: string().length(6).required()
});