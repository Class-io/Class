import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InvalidCredentialsException extends BaseException {
    id = Constants.Exception.INVALID_CREDENTIALS;
    statusCode = 401;
    message = 'Provided credentials are invalid'
}