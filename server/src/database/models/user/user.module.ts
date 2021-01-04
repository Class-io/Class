import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { UserSchema } from "../../schemas/user.schema";
import { UserDAO } from './user.dao';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    providers: [UserDAO],
    exports: [UserDAO]
})

export class UsersModule {}