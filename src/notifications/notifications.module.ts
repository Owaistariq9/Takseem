import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsDataService } from './notifications.data.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notifications } from './notifications.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Notifications])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsDataService],
  exports: [NotificationsService, NotificationsDataService]
})
export class NotificationsModule { }
