import { CreateCourseDTO } from '../dto/create.dto';
import { GetCourseDTO } from '../dto/get.dto';
import { UpdateCourseDTO } from '../dto/update.dto';
import { ICourse } from './ICourse';

export interface ICourseRepository {
    getMany(data: GetCourseDTO): Promise<ICourse[]>;

    get(data: GetCourseDTO): Promise<ICourse | null>;

    create(data: CreateCourseDTO): Promise<ICourse>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: UpdateCourseDTO): Promise<void>;
}