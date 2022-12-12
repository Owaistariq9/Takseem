import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RideRequestStatus } from 'src/core/constants/constants';
import { Rides } from 'src/models/rides.model';

@Injectable()
export class RidesService {
  constructor(
    @InjectModel(Rides) private readonly rides: typeof Rides
  ) { }

  async getRideDetails(ride_id: number) {
    const rides = await this.rides.sequelize.query(`SELECT 
        r.id,
        r.latitude as startLat,
        r.longitude as startLong,
        v.user_id as rider_id,
        u.name as riderName,
        p.name as passengerName,
        rr.id as requestId,
        rr.status,
        rr.passenger_id,
        rr.latitude as passenger_lat,
        rr.longitude as passenger_long,
        ca.latitude as endLat,
        ca.longitude as endLong
        FROM db_takseem.rides AS r
        INNER JOIN db_takseem.ride_requests AS rr ON rr.ride_id=r.id
        INNER JOIN db_takseem.vehicles AS v ON v.id=r.vehicle_id
        INNER JOIN db_takseem.users AS u ON u.id=v.user_id
        INNER JOIN db_takseem.users AS p ON p.id=rr.passenger_id
        INNER JOIN db_takseem.company_addresses AS ca ON ca.id=u.company_location_id
        WHERE (rr.status = '${RideRequestStatus[1]}' OR rr.status = '${RideRequestStatus[4]}') AND r.id = ${ride_id};`)
    return 'This action adds a new ride';
  }
}
