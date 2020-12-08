export class LoginRequestDTO implements Readonly<LoginRequestDTO> {
    email: string;
    password: string;
}

export class LoginResponseDTO implements Readonly<LoginResponseDTO> {
    accessToken: string;
}