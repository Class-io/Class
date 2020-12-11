import { assignObject } from "../../../common/helpers/assign-object";
import { BaseUserDTO } from "./base.dto";

export class UserDTO extends BaseUserDTO implements Readonly<UserDTO> {
    private static readonly FIELDS: string[] = ['id', 'username', 'email', 'joinedAt', 'isConfirmed', 'isTutor'];

    id: string;
    joinedAt: number;
    isConfirmed: boolean;
    isTutor: boolean;

    public static fromObject(object: Partial<UserDTO>): UserDTO {
        const userDTO = new UserDTO();

        assignObject<UserDTO>(userDTO, object, this.FIELDS);

        return userDTO;
    }
}