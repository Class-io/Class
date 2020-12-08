import { Constants } from "../constants";

export abstract class BaseException extends Error {
    public abstract id: number = Constants.DefaultException.ID;
    public abstract statusCode: number = Constants.DefaultException.STATUS;
    public abstract message: string = Constants.DefaultException.MESSAGE;
}