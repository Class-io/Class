import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidAccountTypeException extends BaseException {
    id = Constants.EXCEPTION.INVALID_ACCOUNT_TYPE;
    statusCode = Constants.STATUS_CODE.FORBIDDEN;
    message = 'Account type is invalid for this operation'
}