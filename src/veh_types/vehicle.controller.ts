import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { AuthService } from './vehicle.service';

@Controller('vehicles')
export class AuthController {
    constructor(private readonly usersService: UsersService,
        private readonly authService: AuthService
        ) {}

     @MessagePattern("getVehicleTypes")
     async getVehType(@Payload() body: any) {   
         var types=  await this.authService.getTypes();
         console.log(types)
         return {types: types}

     }

     @MessagePattern("createVehicleType")
     async createVehType(@Payload() body: any) {
        
         var types=  await this.authService.createType(body);
         console.log(types)
         return {message: "Successfully Created"}

     }

     @MessagePattern("updateVehicleType")
     async updateVehType(@Payload() body: any) {
        
         var types=  await this.authService.updateType(body);
         console.log(types)
         return {message: "Successfully Updated"}

     }

     @MessagePattern("deleteVehicleType")
     async deleteVehType(@Payload() id: number) {
        
         var types=  await this.authService.deleteType(id);
         console.log(types)
         return {message: "Successfully Deleted"}

     }

}
