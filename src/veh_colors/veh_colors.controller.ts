import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { VehColorService } from './veh_colors.service';

@Controller('vehicles')
export class VehColorController {
    constructor(
        private readonly vehColorService: VehColorService
    ) { }

    @MessagePattern("getVehicleColors")
    async getColors(@Payload() body: any) {
        var types = await this.vehColorService.get();
        console.log(types)
        return { colors: types }

    }

    @MessagePattern("createVehicleColor")
    async createColors(@Payload() body: any) {

        var types = await this.vehColorService.create(body);
        console.log(types)
        return { message: "Successfully Created" }

    }

    @MessagePattern("updateVehicleColor")
    async updateColors(@Payload() body: any) {

        var types = await this.vehColorService.update(body);
        console.log(types)
        return { message: "Successfully Updated" }

    }

    @MessagePattern("deleteVehicleColor")
    async deleteColors(@Payload() id: number) {

        var types = await this.vehColorService.delete(id);
        console.log(types)
        return { message: "Successfully Deleted" }

    }

}
