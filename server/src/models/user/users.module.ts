import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { UserSchema } from "../../database/schemas/user.schema";
import { UsersService } from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule {}