import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICourse } from './interfaces/ICourse';

@Injectable()
export class CoursesService {
    constructor(@InjectModel('Course') private readonly _courseModel: Model<ICourse>) {}
}