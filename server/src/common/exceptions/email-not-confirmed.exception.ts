import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailNotConfirmedException extends BaseException {
    id = Constants.EXCEPTION.EMAIL_NOT_CONFIRMED;
    statusCode = 403;
    message = 'Email has not been confirmed yet'
}