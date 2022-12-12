import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { Config } from './core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { OtpCodes } from './models/otp_code.model';
import { VehicleDocuments } from './models/vehicle-documents.model';
import { RideModule } from './rides/rides.module';
import { RideRequests } from './models/ride_requests.model';
import { Ride_preferences } from './models/ride_preferences.model';
import { NotificationsModule } from './notifications/notifications.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VehicleModule } from './vehicles/vehicles.module';


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
      dialectOptions: {
        "useUTC": false
      },
      // timezone: "ASIA/Karachi",
      timezone: "-05:00",
      models: [User, OtpCodes, VehicleDocuments, RideRequests, Ride_preferences]
    }),
    AuthModule,
    UserModule,
    UploadFilesModule,
    RideModule,
    NotificationsModule,
    DashboardModule,
    VehicleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
