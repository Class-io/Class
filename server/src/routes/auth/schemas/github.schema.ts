import { object, string } from 'joi';

export const GithubLoginValidationSchema = object({
    code: string().required()
});