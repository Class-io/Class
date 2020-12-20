import { object, string } from 'joi';

export const GoogleLoginValidationSchema = object({
    token: string().required()
});