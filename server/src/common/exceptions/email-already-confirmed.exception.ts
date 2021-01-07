import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailAlreadyConfirmedException extends BaseException {
    id = Constants.EXCEPTION.EMAIL_ALREADY_CONFIRMED;
    statusCode = Constants.STATUS_CODE.FORBIDDEN;
    message = 'Email has been already confirmed'
}