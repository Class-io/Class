import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailAlreadyExistsException extends BaseException {
    id = Constants.EXCEPTION.EMAIL_ALREADY_EXISTS;
    statusCode = Constants.STATUS_CODE.CONFLICT;
    message = 'Email already exists';
}