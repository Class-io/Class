import { BaseUserDTO } from "./base.dto";

export class CreateUserDTO extends BaseUserDTO implements Readonly<CreateUserDTO> {
    password: string;
}