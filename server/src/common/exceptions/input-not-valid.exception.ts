import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InputNotValidException extends BaseException {
    id = Constants.Exception.INPUT_NOT_VALID;
    statusCode = 400;
    message = '';

    public constructor(message: string) {
        super();
        
        this.message = message;
    }
}