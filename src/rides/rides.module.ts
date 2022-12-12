import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { RidesService } from './rides.service';
import { User } from '../models/user.model';
import { Rides } from '../models/rides.model';
import { Ride_days } from '../models/ride_days.model';
import { Ride_preferences } from '../models/ride_preferences.model';
import { RideRequests } from '../models/ride_requests.model';
import { Ride_bookings } from '../models/ride_bookings.model';
import { RideBookingPassengers } from '../models/ride_booking_passengers';
import { companies } from '../models/companies.model';
import { company_addresses } from '../models/company_addresses.model';
import { CompaniesController } from './rides.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { company_codes } from 'src/models/company_codes.model';

@Module({
  imports: [SequelizeModule.forFeature([companies, company_addresses, company_codes, User,Rides,Ride_bookings,RideBookingPassengers,Ride_days,Ride_preferences, RideRequests ])],
  providers: [RidesService],
  exports: [RidesService],
  controllers: [CompaniesController]
})
export class RideModule { }
