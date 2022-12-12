import { Module } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
  providers: [VehicleService],
  controllers: [VehiclesController]
})
export class VehicleModule {}
