import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './routes/auth/auth.module';
import config from './config';
import { UsersModule } from './routes/user/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),
    AuthModule,
    UsersModule
  ],
})

export class AppModule {}