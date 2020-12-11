export class RegisterRequestDTO implements Readonly<RegisterRequestDTO> {
    email: string;
    username: string;
    password: string;
}

export class TutorRegisterRequestDTO extends RegisterRequestDTO implements Readonly<TutorRegisterRequestDTO> {
    isTutor: boolean;
}

export class RegisterResponseDTO implements Readonly<RegisterResponseDTO> {
    accessToken: string;
}