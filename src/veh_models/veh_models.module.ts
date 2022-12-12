import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { VehModelService } from './veh_models.service';
import { veh_models } from '../models/veh_models.model';
import { VehModelController } from './veh_models.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([veh_models]),UserModule, PassportModule, JwtModule.register({
      secret: Config.secret,
      signOptions: { expiresIn: Config.jwt_expire_time}
  })],
  providers: [VehModelService],
  exports: [VehModelService],
  controllers: [VehModelController]
})
export class veh_modelModule {}
