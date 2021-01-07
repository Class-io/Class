import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './routes/auth/auth.module';
import config from './config';
import { UserModelModule } from './database/models/user/user.model.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/task.module';
import { UserSeederModule } from './database/seeders/user/user-seeder.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './events/event.module';
import { AccountModule } from './routes/account/account.module';
import { CourseModelModule } from './database/models/course/course.model.module';
import { CourseSeederModule } from './database/seeders/course/course-seeder.module';
import { FileModule } from './services/file/file.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),
    AccountModule,
    AuthModule,

    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),

    UserSeederModule,
    UserModelModule,
    UserModule,

    CourseSeederModule,
    CourseModelModule,

    TaskModule,
    EventModule,
    FileModule
  ],
})

export class AppModule {}