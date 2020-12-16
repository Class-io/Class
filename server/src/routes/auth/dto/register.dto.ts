export class RegisterRequestDTO implements Readonly<RegisterRequestDTO> {
    email: string;
    username: string;
    password: string;
    isTutor: boolean = false;
}