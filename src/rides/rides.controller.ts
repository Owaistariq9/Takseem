import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, Request, Get, Patch, Delete, Query, BadRequestException } from '@nestjs/common';
import { RideService } from './rides.service';
import { Express } from 'express';
import { Body, Headers, UnauthorizedException, UseFilters } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { response } from 'src/helpers/helper-functions';

@Controller('rides')
export class RideController {
    constructor(private readonly rideService: RideService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createRide(@Request() req: any) {
        if (!req.body) {
            throw new BadRequestException("Missing Fields");
        }
        req.body.userId = req.user.id;
        return this.rideService.createRide(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get("myride")
    async getMyRides(@Request() req: any) {
        return this.rideService.getUserRides(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ride_type/:userLatitude/:userLongitude/:music/:smoking/:ac/:gender_preference/:start_time/:return_time/:page/:limit')
    async searchRide(@Request() req: any) {

        let params: any = {};

        params.userId = req.user.id
        params.userLatitude = Number(req.params.userLatitude);
        params.userLongitude = Number(req.params.userLongitude);
        params.page = Number(req.params.page);
        params.limit = Number(req.params.limit);
        params.start_time = Number(req.params.start_time);
        params.ride_type = req.params.ride_type;

        if (req.params.return_time !== "false") {
            params.return_time = Number(req.params.return_time);
        }

        if (req.params.music === 'on' || req.params.music === 'off') {
            params.music = req.params.music;
        }
        else {
            params.music = 'non';
        }

        if (req.params.ac === 'on' || req.params.ac === 'off') {
            params.ac = req.params.ac;
        }
        else {
            params.ac = 'non';
        }

        if (req.params.gender_preference === "male") {
            params.gender_preference = "male";
        }
        else if (req.params.gender_preference === "female") {
            params.gender_preference = "female";
        }
        else {
            params.gender_preference = "non";
        }
        return this.rideService.searchRide(params);

    }

    @UseGuards(JwtAuthGuard)
    @Post(':ride_id/requests')
    async createRideRequest(@Request() req: any) {
        req.params.passenger_id = req.user.id;
        if (!req.body.driverUserId) {
            throw new BadRequestException("Missing field error driverUserId");
        }
        if (!req.body.pickup) {
            throw new BadRequestException("Missing field error pickup");
        }
        if (!req.body.company_location_id) {
            throw new BadRequestException("Missing field error company_location_id");
        }
        if (!req.body.userName) {
            throw new BadRequestException("Missing field error userName");
        }
        req.params.driverUserId = req.body.driverUserId;
        req.params.pickup = req.body.pickup;
        req.params.company_location_id = req.body.company_location_id;
        req.params.userName = req.body.userName;
        return this.rideService.createRideRequest(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':ride_id/requests/:id/not-coming')
    async notComingRideRequest(@Request() req: any) {
        if (!req.body.rider_id) {
            throw new BadRequestException("Missing field error rider_id");
        }
        req.params.passenger_id = req.user.id;
        req.params.rider_id = req.body.rider_id;
        req.params.passangerName = req.user.name;
        return this.rideService.notComingRideRequest(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':ride_id/requests/:id/picked')
    async pickedRideRequest(@Request() req: any) {
        if (!req.body.rider_id) {
            throw new BadRequestException("Missing field error rider_id");
        }
        req.params.passenger_id = req.user.id;
        req.params.rider_id = req.body.rider_id;
        req.params.passangerName = req.user.name;
        return this.rideService.passengerPickedNotification(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':ride_id/requests/:id/:status')
    async updateRideRequest(@Request() req: any) {
        if (!req.body.passenger_id) {
            throw new BadRequestException("Missing field error passenger_id");
        }
        req.params.passenger_id = req.body.passenger_id
        return this.rideService.updateRideRequest(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Get('requests/booked')
    async getAllBookedRides(@Request() req: any) {
        return this.rideService.getAllBookedRides(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':ride_id/requests/:id/cancel')
    async cancelledRideRequest(@Request() req: any) {
        if (!req.body.rider_id) {
            throw new BadRequestException("Missing field error rider_id");
        }
        if (!req.body.message) {
            throw new BadRequestException("Missing field error message");
        }
        if (!req.body.userName) {
            throw new BadRequestException("Missing field error userName");
        }
        req.params.passenger_id = req.user.id;
        req.params.rider_id = req.body.rider_id;
        req.params.message = req.body.message;
        req.params.userName = req.body.userName;
        return this.rideService.cancelledRideRequest(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ride_id/data')
    async getStartRideData(@Request() req: any) {
        req.params.user_id = req.user.id
        return this.rideService.getStartRideData(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':ride_id/end')
    async endRide(@Request() req: any) {
        if (!req.body.passangerIds) {
            throw new BadRequestException("Missing field error passangerIds required");
        }
        req.params.passangerIds = req.body.passangerIds;
        return this.rideService.endRide(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':ride_id/passengers')
    async getAllPassengers(@Request() req: any) {
        return this.rideService.getPassengersByRideId(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('updateLastLocation')
    async updateUserLastLocation(@Request() req: any) {
        req.body.user_id = req.user.id
        return this.rideService.updateLastLocation(req.body);
    }


}
