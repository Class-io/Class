import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './routes/auth/auth.module';
import config from './config';
import { UserModule } from './database/models/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/task.module';
import { UserSeederModule } from './database/seeders/user/user-seeder.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './events/event.module';
import { AccountModule } from './routes/account/account.module';
import { CourseModule } from './database/models/course/course.module';
import { CourseSeederModule } from './database/seeders/course/course-seeder.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.DATABASE.URL, { dbName: config.DATABASE.NAME, useFindAndModify: false }),
    EventEmitterModule.forRoot(),
    UserSeederModule,
    CourseSeederModule,
    AuthModule,
    AccountModule,
    UserModule,
    CourseModule,
    ScheduleModule.forRoot(),
    TaskModule,
    EventModule
  ],
})

export class AppModule {}