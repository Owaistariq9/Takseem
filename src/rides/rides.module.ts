import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { Ride_days } from '../models/ride_days.model';
import { Ride_preferences } from '../models/ride_preferences.model';
import { Rides } from '../models/rides.model';
import { Veh_documents } from '../models/veh_documents.model';
import { Vehicles } from '../models/vehicles.model';
import { RidesController } from './rides.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RideRequests } from 'src/models/ride_requests.model';
import { CancelRideRequests } from 'src/models/cancel_ride_requests.model';
import { UserLastLocations } from 'src/models/users_last_locations.model';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Ride_days, Ride_preferences, Rides, RideRequests, Vehicles, Veh_documents, CancelRideRequests, User,UserLastLocations])
  ],
  providers: [RidesService],
  exports: [RidesService],
  controllers: [RidesController]
})
export class ridesModule { }
