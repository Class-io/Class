export class RegisterRequestDTO implements Readonly<RegisterRequestDTO> {
    email: string;
    username: string;
    password: string;
}

export class RegisterResponseDTO implements Readonly<RegisterResponseDTO> {
    accessToken: string;
}