import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Constants } from 'src/core/constants/constants';
import { Config } from '../core/config/config';

@Injectable()
export class RideService {
    private rideMicroservice: ClientProxy;
    private dashboardMicroservice: ClientProxy;
    private notificationsMicroservice: ClientProxy;
    constructor() {
        this.rideMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.ride_microservice_host,
                port: Config.ride_microservice_port,
            },
        });
        this.dashboardMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.dashboard_microservice_host,
                port: Config.dashboard_microservice_port,
            },
        });
        this.notificationsMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.notification_microservice_host,
                port: Config.notification_microservice_port,
            },
        });
    }



    async createRide(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("createRide", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getUserRides(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("getUserRides", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async searchRide(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("searchRide", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async createRideRequest(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("createRideRequest", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async updateRideRequest(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("updateRideRequest", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getAllBookedRides(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("getAllBookedRides", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async cancelledRideRequest(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("cancelledRideRequest", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async notComingRideRequest(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("notComingRideRequest", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getStartRideData(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("getStartRideData", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async endRide(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("endRide", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getPassengersByRideId(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("getPassengersByRideId", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async updateLastLocation(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("updateUserLastLocation", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async passengerPickedNotification(body: any) {
        try {
            let x = this.rideMicroservice.send<any>("pickedRideRequest", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }


}
