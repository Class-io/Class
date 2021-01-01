import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InputNotValidException extends BaseException {
    id = Constants.EXCEPTION.INPUT_NOT_VALID;
    statusCode = 401;
    message = '';

    public constructor(message: string) {
        super();
        
        this.message = message;
    }
}