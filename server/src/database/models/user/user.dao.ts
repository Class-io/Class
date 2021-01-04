import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "./dto/create.dto";
import { GetUserDTO } from './dto/get.dto';
import { UpdateUserDTO } from "./dto/update.dto";
import { IUser } from "./interfaces/IUser";

@Injectable()
export class UserDAO {
    constructor(@InjectModel('User') private readonly _userModel: Model<IUser>) {}

    public async getMany(data: GetUserDTO = {}): Promise<IUser[]> {
        const users = await this._userModel.find(data);
        return users;
    }

    public async get(data: GetUserDTO = {}): Promise<IUser | null> {
        const user = await this._userModel.findOne(data);
        return user;
    }

    public async create(data: CreateUserDTO): Promise<IUser> {
        const user = new this._userModel(data);
        return user.save();
    }

    public async deleteById(id: string): Promise<void> {
        await this._userModel.deleteOne({ _id: id });
    }

    public async updateById(id: string, data: UpdateUserDTO): Promise<void> {
        await this._userModel.findByIdAndUpdate(id, data);
    }
}