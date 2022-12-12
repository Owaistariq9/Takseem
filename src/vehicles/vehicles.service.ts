import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Config } from 'src/core/config/config';

@Injectable()
export class VehicleService {
    private dashboardMicroservice: ClientProxy;
    constructor() {
        this.dashboardMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.dashboard_microservice_host,
                port: Config.dashboard_microservice_port,
            },
        });
    }

    async getColor(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getVehicleColors", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async addColor(body: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("createVehicleColors", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getModel(makeId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getVehicleModels", makeId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getType(compId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getVehicleTypes", compId).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async getMake(typeId: any) {
        try {
            let x = this.dashboardMicroservice.send<any>("getVehicleMakes", typeId).pipe(catchError(val => {
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
