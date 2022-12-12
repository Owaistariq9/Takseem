import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './vehicle.service';
import { veh_types } from '../models/veh_types.model';
import { AuthController } from './vehicle.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([veh_types]),UserModule, PassportModule, JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: Config.jwt_expire_time}
  })],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
