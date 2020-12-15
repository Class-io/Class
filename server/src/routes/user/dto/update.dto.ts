export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
    username?: string;
    password?: string;
    confirmationCode?: {
        code: string;
        expiresAt: number;
    }
}