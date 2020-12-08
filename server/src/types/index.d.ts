import { UserDTO } from "src/models/user/dto/user.dto";

declare module 'express' {
    export interface Request {
        user?: UserDTO
    }
}