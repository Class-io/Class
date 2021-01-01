import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCourseDTO } from './dto/create.dto';
import { GetCourseDTO } from './dto/get.dto';
import { ICourse } from './interfaces/ICourse';

@Injectable()
export class CoursesService {
    constructor(@InjectModel('Course') private readonly _courseModel: Model<ICourse>) {}

    public async getMany(data: GetCourseDTO): Promise<ICourse[]> {
        const courses = await this._courseModel.find(data);
        return courses;
    }

    public async get(data: GetCourseDTO): Promise<ICourse | null> {
        const course = await this._courseModel.findOne(data);
        return course;
    }

    public async create(data: CreateCourseDTO): Promise<ICourse> {
        
    }
}