import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { UserSchema } from "../../schemas/user.schema";
import { UserRepository } from './user.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    providers: [UserRepository],
    exports: [UserRepository]
})

export class UserModelModule {}