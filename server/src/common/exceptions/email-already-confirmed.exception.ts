import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailAlreadyConfirmedException extends BaseException {
    id = Constants.Exception.EMAIL_ALREADY_CONFIRMED;
    statusCode = 401;
    message = 'Email has been already confirmed'
}