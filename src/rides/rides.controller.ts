import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from '../core/constants/constants';
import { RidesService } from './rides.service';

@Controller('rides')
export class RidesController {
    constructor(
        private readonly rideService: RidesService
    ) { }


    @MessagePattern("createRide")
    async createRide(@Payload() body: any) {

        const ride = await this.rideService.create(body);
        // return true
        return { ride }

    }

    @MessagePattern("getUserRides")
    async getUserRides(@Payload() body: any) {

        const ride = await this.rideService.getUserRides(body);
        return ride

    }

    @MessagePattern("searchRide")
    async searchRide(@Payload() params: any) {
        return await this.rideService.searchRides(params);
    }

    @MessagePattern("createRideRequest")
    async createRideRequest(@Payload() body: any) {
        return await this.rideService.createRideRequest(body);
    }

    @MessagePattern("updateRideRequest")
    async updateRideRequest(@Payload() params: any) {
        if (params.status === "accept") {
            return await this.rideService.acceptRideRequest(params);
        }
        else {
            return await this.rideService.rejectRideRequest(params);
        }
    }

    @MessagePattern("getUserVehicleCount")
    async getUserVehicleCount(@Payload() user_id: number) {
        return await this.rideService.getUserVehicleCount(user_id);
    }

    @MessagePattern("getAllBookedRides")
    async getAllBookedRides(@Payload() user_id: number) {
        return await this.rideService.getAllBookedRides(user_id);
    }

    @MessagePattern("getAllPendingRides")
    async getAllPendingRides(@Payload() user_id: number) {
        return await this.rideService.getAllPendingRides(user_id);
    }

    @MessagePattern("getAllRejectedRides")
    async getAllRejectedRides(@Payload() user_id: number) {
        return await this.rideService.getAllRejectedRides(user_id);
    }

    @MessagePattern("getAllCancelledRides")
    async getAllCancelledRides(@Payload() user_id: number) {
        return await this.rideService.getAllCancelledRides(user_id);
    }

    @MessagePattern("cancelledRideRequest")
    async cancelledRideRequest(@Payload() body: any) {
        return await this.rideService.cancelledRideRequest(body);
    }

    @MessagePattern("notComingRideRequest")
    async notComingRideRequest(@Payload() body: any) {
        return await this.rideService.notComingRideRequest(body);
    }

    @MessagePattern("pickedRideRequest")
    async pickedRideRequest(@Payload() body: any) {
        return await this.rideService.pickedRideRequest(body);
    }

    @MessagePattern("getStartRideData")
    async getStartRideData(@Payload() body: any) {
        return await this.rideService.getStartRideData(body);
    }

    @MessagePattern("endRide")
    async endRide(@Payload() body: any) {
        return await this.rideService.endRide(body);
    }

    @MessagePattern("getPassengersByRideId")
    async allPassengers(@Payload() body: any) {
        return await this.rideService.getPassengersByRideId(body);
    }

    @MessagePattern("updateUserLastLocation")
    async updateUserLastLocation(@Payload() body: any) {
        return await this.rideService.updateUserLastLocation(body);
    }

}
