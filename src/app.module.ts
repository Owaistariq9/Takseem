import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/user.module';
import { AuthModule } from './veh_types/vehicle.module';
import { veh_makeModule } from './veh_makes/veh_makes.module';
import { veh_colorModule } from './veh_colors/veh_colors.module';
import { veh_modelModule } from './veh_models/veh_models.module';
import { RideModule } from './rides/rides.module';
import { CompanyModule } from './companies/companies.module';
import { Config } from './core/config/config';
import { VehiclesModule } from './vehicles/vehicles.module';

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
      models: []
    }),
    UserModule,
    AuthModule,
    veh_colorModule,
    veh_modelModule,
    veh_makeModule,
    RideModule,
    CompanyModule,
    VehiclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
