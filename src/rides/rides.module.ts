import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesGateway } from './rides.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rides } from 'src/models/rides.model';
import { RideRequests } from 'src/models/ride_requests.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Rides, RideRequests])
  ],
  providers: [RidesGateway, RidesService]
})
export class RidesModule { }
