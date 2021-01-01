import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
    id = Constants.EXCEPTION.UNAUTHORIZED;
    statusCode = 401;
    message = 'Unauthorized'
}