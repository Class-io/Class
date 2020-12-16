import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class ExpiredConfirmationCodeException extends BaseException {
    id = Constants.Exception.EXPIRED_CONFIRMATION_CODE;
    statusCode = 401;
    message = 'Confirmation code is expired'
}