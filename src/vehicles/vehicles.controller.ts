import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { response } from 'src/helpers/helper-functions';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService
    ) { }

    @MessagePattern("getUserVehicles")
    async getUserVehicles(@Payload() userId: number) {
        const vehicles = await this.vehiclesService.getUserVehicles(userId);
        return response(true, 200, "User Vehicles", vehicles);
    }
}
