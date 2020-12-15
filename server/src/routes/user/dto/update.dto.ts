export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
    confirmationCode?: {
        code: string;
        expiresAt: number;
    }
}