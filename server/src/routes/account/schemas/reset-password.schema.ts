import { object, string } from 'joi';

export const ResetPasswordValidationSchema = object({
    email: string().min(3).max(64).email().required(),
    code: string().length(6).required(),
    password: string().min(3).max(64).required()
});