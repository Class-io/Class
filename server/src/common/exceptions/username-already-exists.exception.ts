import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UsernameAlreadyExistsException extends BaseException {
    id = Constants.EXCEPTION.USERNAME_ALREADY_EXISTS;
    statusCode = Constants.STATUS_CODE.CONFLICT;
    message = 'Username already exists';
}