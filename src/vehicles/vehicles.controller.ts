import { Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VehicleService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Get("getColors")
    async getColor(@Request() req: any) {
        return this.vehicleService.getColor("");
    }

    @Post("createColor")
    async verifyCompanyCode(@Request() req: any) {
        return this.vehicleService.addColor(req.body);
    }

    @Get("getTypes")
    async getType(@Request() req: any) {
        return this.vehicleService.getType("");
    }

    @Get("getMakes")
    async getMake(@Request() req: any) {
        return this.vehicleService.getMake(req.query.type_id);
    }

    @Get("getModels")
    async getModel(@Request() req: any) {
        return this.vehicleService.getModel(req.query.make_id);
    }

}
