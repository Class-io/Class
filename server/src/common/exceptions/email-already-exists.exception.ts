import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailAlreadyExistsException extends BaseException {
    id = Constants.Exception.EMAIL_ALREADY_EXISTS;
    statusCode = 401;
    message = 'Email already exists'
}