import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { Config } from './core/config/config';
import { CompanyCodesModule } from './company-codes/company-codes.module';

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
      // timezone: "ASIA/Karachi",
      timezone: "-05:00",
      models: []
    }),
    UserModule,
    AuthModule,
    CompanyCodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }