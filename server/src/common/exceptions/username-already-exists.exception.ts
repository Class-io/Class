import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UsernameAlreadyExistsException extends BaseException {
    id = Constants.Exception.USERNAME_ALREADY_EXISTS;
    statusCode = 401;
    message = 'Username already exists'
}