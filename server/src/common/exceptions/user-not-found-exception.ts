import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UserNotFoundException extends BaseException {
    id = Constants.EXCEPTION.USER_NOT_FOUND;
    statusCode = Constants.STATUS_CODE.NOT_FOUND;
    message = 'User does not exist'
}