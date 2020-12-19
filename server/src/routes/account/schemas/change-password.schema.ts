import { object, string } from 'joi';

export const ChangePasswordValidationSchema = object({
    password: string().min(3).max(64).required(),
    newPassword: string().min(3).max(64).required()
});