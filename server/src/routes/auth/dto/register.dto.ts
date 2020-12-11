export class RegisterRequestDTO implements Readonly<RegisterRequestDTO> {
    email: string;
    username: string;
    password: string;
    isTutor: boolean = false;
}

export class RegisterResponseDTO implements Readonly<RegisterResponseDTO> {
    accessToken: string;
}