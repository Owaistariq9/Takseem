import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { VehMakeService } from './veh_makes.service';
import { veh_makes } from '../models/veh_makes.model';
import { VehMakeController } from './veh_makes.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([veh_makes]),UserModule, PassportModule, JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: Config.jwt_expire_time}
  })],
  providers: [VehMakeService],
  exports: [VehMakeService],
  controllers: [VehMakeController]
})
export class veh_makeModule {}
