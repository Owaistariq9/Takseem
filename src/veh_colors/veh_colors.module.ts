import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { VehColorService } from './veh_colors.service';
import { veh_colors } from '../models/veh_colors.model';
import { VehColorController } from './veh_colors.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([veh_colors]),UserModule, PassportModule, JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: Config.jwt_expire_time}
  })],
  providers: [VehColorService],
  exports: [VehColorService],
  controllers: [VehColorController]
})
export class veh_colorModule {}
