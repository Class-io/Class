import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailNotConfirmedException extends BaseException {
    id = Constants.Exception.EMAIL_NOT_CONFIRMED;
    statusCode = 401;
    message = 'Email has not been confirmed yet'
}