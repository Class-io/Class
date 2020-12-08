import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class UnauthorizedException extends BaseException {
    id = Constants.Exception.UNAUTHORIZED;
    statusCode = 401;
    message = 'Unauthorized'
}