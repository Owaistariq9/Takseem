import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { VehMakeService } from './veh_makes.service';

@Controller('vehicles')
export class VehMakeController {
    constructor(
        private readonly vehMakeService: VehMakeService
        ) {}

     @MessagePattern("getVehicleMakes")
     async getVehType(@Payload() body: any) {   
         var types=  await this.vehMakeService.getTypes();
         console.log(types)
         return {makes: types}

     }

     @MessagePattern("createVehicleMake")
     async createVehType(@Payload() body: any) {
        
         var types=  await this.vehMakeService.createType(body);
         console.log(types)
         return {message: "Successfully Created"}

     }

     @MessagePattern("updateVehicleMake")
     async updateVehType(@Payload() body: any) {
        
         var types=  await this.vehMakeService.updateType(body);
         console.log(types)
         return {message: "Successfully Updated"}

     }

     @MessagePattern("deleteVehicleMake")
     async deleteVehType(@Payload() id: number) {
        
         var types=  await this.vehMakeService.deleteType(id);
         console.log(types)
         return {message: "Successfully Deleted"}

     }

}
