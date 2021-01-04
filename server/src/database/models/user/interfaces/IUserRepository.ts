import { CreateUserDTO } from '../dto/create.dto';
import { GetUserDTO } from '../dto/get.dto';
import { UpdateUserDTO } from '../dto/update.dto';
import { IUser } from './IUser';

export interface IUserRepository {
    getMany(data: GetUserDTO): Promise<IUser[]>;

    get(data: GetUserDTO): Promise<IUser | null>;

    create(data: CreateUserDTO): Promise<IUser>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: UpdateUserDTO): Promise<void>;
}