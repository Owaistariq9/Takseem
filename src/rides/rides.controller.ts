import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { RidesService } from './rides.service';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly rideService: RidesService
    ) { }


 

    @MessagePattern("getCompanyAddressById")
    async getCompanyAddressById(@Payload() id: any) {
        console.log("here");
        return await this.rideService.getCompanyLocationById(id);
    }



}
