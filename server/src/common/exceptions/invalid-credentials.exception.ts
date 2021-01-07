import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InvalidCredentialsException extends BaseException {
    id = Constants.EXCEPTION.INVALID_CREDENTIALS;
    statusCode = Constants.STATUS_CODE.UNAUTHORIZED;
    message = 'Provided credentials are invalid'
}