export class ConfirmEmailRequestDTO implements Readonly<ConfirmEmailRequestDTO> {
    email: string;
    code: string;
}