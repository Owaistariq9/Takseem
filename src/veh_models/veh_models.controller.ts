import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { VehModelService } from './veh_models.service';

@Controller('vehicles')
export class VehModelController {
    constructor(
        private readonly vehModelService: VehModelService
        ) {}

     @MessagePattern("getVehicleModels")
     async getVehType(@Payload() body: any) {   
         var types=  await this.vehModelService.get();
         console.log(types) 
         return {models: types}

     }

     @MessagePattern("createVehicleModel")
     async createVehType(@Payload() body: any) {
        
         var types=  await this.vehModelService.create(body);
         console.log(types)
         return {message: "Successfully Created"}

     }

     @MessagePattern("updateVehicleModel")
     async updateVehType(@Payload() body: any) {
        
         var types=  await this.vehModelService.update(body);
         console.log(types)
         return {message: "Successfully Updated"}

     }

     @MessagePattern("deleteVehicleModel")
     async deleteVehType(@Payload() id: number) {
        
         var types=  await this.vehModelService.delete(id);
         console.log(types)
         return {message: "Successfully Deleted"}

     }

}
