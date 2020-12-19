export class ResetPasswordRequestDTO implements Readonly<ResetPasswordRequestDTO> {
    email: string;
    code: string;
    password: string;
}