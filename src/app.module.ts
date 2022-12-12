import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RidesModule } from './rides/rides.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from './core/config/config';

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
    RidesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
