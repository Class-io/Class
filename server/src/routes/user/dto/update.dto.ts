export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
    isConfirmed?: boolean;
    confirmationCode?: {
        code?: string;
        expiresAt?: number;
    }
}