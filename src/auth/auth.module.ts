import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { Config } from 'src/core/config/config';
@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: Config.secret,
    // signOptions: { expiresIn: process.env.TOKEN_EXPIRY}
  })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
