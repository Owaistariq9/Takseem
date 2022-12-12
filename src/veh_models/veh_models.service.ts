import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import  {veh_models}  from '../models/veh_models.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VehModelService {
    private notificationService: ClientProxy
    constructor(
        @InjectModel(veh_models) private readonly vehModel: typeof veh_models
        ){
            this.notificationService = ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                  host: Config.vehicle_microservice_host,
                  port: Config.vehicle_microservice_port,
                },
            });
        }

    async get():Promise<any>{
        
        return await this.vehModel.findAll({});

    }

    async create(body: any):Promise<any>{
        
        const insertData = new veh_models(body);
        var data = insertData.toJSON();
        delete data["id"];
        var result = await veh_models.create(data)
        console.log(result)
        return true
    }

    async update(body:any):Promise<any>{

        const parsedData = new veh_models(body);
        var updateData = parsedData.toJSON();
        var typeId = updateData.id;
        delete updateData["id"]
        var result = await veh_models.update(updateData,{where: {id: typeId}})
        return result
    }

    async delete(id:number):Promise<any>{

        var result = await veh_models.destroy({where: {id}})
        return result
    }


}
