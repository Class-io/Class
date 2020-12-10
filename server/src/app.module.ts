import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './routes/auth/auth.module';
import config from './config';
import { UsersModule } from './routes/user/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './common/tasks/tasks.module';
import { UserSeederModule } from './database/seeders/user/user-seeder.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),
    UserSeederModule,
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})

export class AppModule {}