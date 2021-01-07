import { Constants } from "../constants";
import { BaseException } from "./base.exception";

export class InvalidImageFormatException extends BaseException {
    id = Constants.EXCEPTION.INVALID_IMAGE_FORMAT;
    statusCode = Constants.STATUS_CODE.UNSUPPORTED_MEDIA_TYPE;
    message = 'Provided image format is not supported'
}