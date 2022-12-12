import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Config } from 'src/core/config/config';

@Injectable()
export class DashboardService {
    private dashboardMicroservice: ClientProxy;
    private notificationsMicroservice: ClientProxy;
    constructor() {
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

    async getAllCompanies(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getAll", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getByID(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getbyID", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getAddresses(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getLocations", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async verifyCompanyCode(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("verifyCode", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async sendCompanyCodeMail(body: any) {
        try {
            let x = this.notificationsMicroservice.send<any>("sendCompanyCodeMail", body).pipe(catchError(val => {
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
