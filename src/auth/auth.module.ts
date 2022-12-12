import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { Config } from 'src/core/config/config';
import { CompanyCodesModule } from 'src/company-codes/company-codes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { OtpCodes } from 'src/models/otp_code.model';
import { Vehicles } from 'src/models/vehicles.model';
import { Rides } from 'src/models/rides.model';

@Module({
  imports: [UserModule, CompanyCodesModule, PassportModule,
    SequelizeModule.forFeature([OtpCodes, Vehicles, Rides]),
    JwtModule.register({
      secret: Config.secret,
      // signOptions: { expiresIn: Config.jwt_expire_time}
    })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
