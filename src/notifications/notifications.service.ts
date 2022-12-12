import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Config } from 'src/core/config/config';

@Injectable()
export class NotificationsService {
    private notificationsMicroservice: ClientProxy;
    constructor() {
        this.notificationsMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.notification_microservice_host,
                port: Config.notification_microservice_port,
            },
        });
    }

    async getUserNotifications(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("getUserNotifications", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getIsSeenNotificationsCount(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("getIsSeenNotificationsCount", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async updateSeenNotification(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("updateSeenNotification", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getUserNotificationsByType(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("getUserNotificationsByType", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async updateRideRequestNotification(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("updateRideRequestNotification", body).pipe(catchError(val => {
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
