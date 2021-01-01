import { Constants } from "../constants";

export abstract class BaseException extends Error {
    public abstract id: number = Constants.DEFAULT_EXCEPTION.ID;
    public abstract statusCode: number = Constants.DEFAULT_EXCEPTION.STATUS;
    public abstract message: string = Constants.DEFAULT_EXCEPTION.MESSAGE;
}