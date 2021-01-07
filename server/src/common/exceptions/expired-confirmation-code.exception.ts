import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class ExpiredConfirmationCodeException extends BaseException {
    id = Constants.EXCEPTION.EXPIRED_CONFIRMATION_CODE;
    statusCode = Constants.STATUS_CODE.FORBIDDEN;
    message = 'Confirmation code is expired'
}