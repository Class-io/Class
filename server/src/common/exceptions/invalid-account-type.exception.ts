import { Constants } from '../constants';
import { BaseException } from './base.exception';

export class InvalidAccountTypeException extends BaseException {
    id = Constants.Exception.INVALID_ACCOUNT_TYPE;
    statusCode = 401;
    message = 'Account type is invalid for this operation'
}