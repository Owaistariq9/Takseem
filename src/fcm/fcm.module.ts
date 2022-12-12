import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { FcmTokens } from './fcm-token.model';
import { FcmController } from './fcm.controller';
import { FcmDataService } from './fcm.data.service';
import { FcmService } from './fcm.service';

@Module({
  imports: [
    SequelizeModule.forFeature([FcmTokens]),
    NotificationsModule
  ],
  controllers: [FcmController],
  providers: [FcmService, FcmDataService]
})
export class FcmModule { }
