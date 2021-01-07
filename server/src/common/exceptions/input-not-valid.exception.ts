import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InputNotValidException extends BaseException {
    id = Constants.EXCEPTION.INPUT_NOT_VALID;
    statusCode = Constants.STATUS_CODE.BAD_REQUEST;
    message = '';

    public constructor(message: string) {
        super();
        this.message = message;
    }
}