import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('*/15 * * * * *')
  public removeUsers() {
    this.logger.debug('Called every 5 secs');
  }
}