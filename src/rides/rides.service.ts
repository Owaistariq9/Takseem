import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import { Ride_bookings } from '../models/ride_bookings.model';
import { company_addresses } from '../models/company_addresses.model';
import { Vehicles } from '../models/vehicles.model';
import { InjectModel } from '@nestjs/sequelize';
import { companies } from 'src/models/companies.model';
import generator from 'generate-password'
import { Rides } from 'src/models/rides.model';

@Injectable()
export class RidesService {
  private notificationService: ClientProxy
  constructor(
    @InjectModel(company_addresses) private readonly companyAddressModel: typeof company_addresses,
    @InjectModel(companies) private readonly companiesModel: typeof companies,
    @InjectModel(Ride_bookings) private readonly rideBookingsModel: typeof Ride_bookings,
  ) {
    this.notificationService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: Config.vehicle_microservice_host,
        port: Config.vehicle_microservice_port,
      },
    });
  }

  async getBookings(driver_id: number, vehicle_type: number, company_id: number): Promise<any> {
    try {

      var filterQuery = {
        ...driver_id && { company_id: driver_id },
        ...vehicle_type && { company_id: vehicle_type },
      };

      return await Ride_bookings.findAll({ include: [{model: Vehicles}] });

    } catch (error) {
      console.log(error)
      return false;
    }
  }

 

  async getCompanyLocationById(id: number): Promise<any> {
    try {
      const companyLocation: any = await this.companyAddressModel.findOne({
        raw: true,
        where: { id: id }
      })
      return companyLocation;
    } catch (error) {
      console.log(error)
      return false;
    }
  }





 

  

}
