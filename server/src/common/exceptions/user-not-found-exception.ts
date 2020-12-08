import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UserNotFoundException extends BaseException {
    id = Constants.Exception.USER_NOT_FOUND;
    statusCode = 404;
    message = 'User does not exist'
}