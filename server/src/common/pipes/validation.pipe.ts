import { ObjectSchema, ValidationResult } from "joi";
import { Injectable, PipeTransform } from "@nestjs/common";
import { InputNotValidException } from "../exceptions/input-not-valid.exception";

@Injectable()
export class ValidationPipe implements PipeTransform {
    public constructor(private readonly _schema: ObjectSchema) {}

    public transform(value: unknown): unknown {
        const result: ValidationResult = this._schema.validate(value);
        if(result.error) throw new InputNotValidException(result.error.message);

        return value;
    }
}