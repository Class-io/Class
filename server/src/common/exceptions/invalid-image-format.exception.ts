import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InvalidImageFormatException extends BaseException {
    id = Constants.EXCEPTION.INVALID_IMAGE_FORMAT;
    statusCode = 415;
    message = 'Provided image format is not supported'
}