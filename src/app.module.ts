import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from './core/config/config';
import { EmailModule } from './email/email.module';
import { OtpCodeModule } from './otp_code/otp_code.module';
import { FcmModule } from './fcm/fcm.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: Config.db_userName,
      password: Config.db_password,
      database: "db_takseem",
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        "useUTC": false
      },
      timezone: "ASIA/Karachi",
      // timezone: "-05:00",
      models: []
    }),
  EmailModule,
  OtpCodeModule,
  FcmModule,
  NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
