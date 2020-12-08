import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { UserSchema } from "../../database/schemas/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: [UserSchema]}])],
    providers: []
})

export class UsersModule {}