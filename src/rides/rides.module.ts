import { Module } from '@nestjs/common';
import { RideService } from './rides.service';
import { RideController } from './rides.controller';

@Module({
  providers: [RideService],
  controllers: [RideController]
})
export class RideModule {}
