import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import  {veh_types}  from '../models/veh_types.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
    private notificationService: ClientProxy
    constructor(
        @InjectModel(veh_types) private readonly vehTypeModel: typeof veh_types
        ){
            this.notificationService = ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                  host: Config.vehicle_microservice_host,
                  port: Config.vehicle_microservice_port,
                },
            });
        }

    async getTypes():Promise<any>{
        
        return await this.vehTypeModel.findAll({});

    }

    async createType(body: any):Promise<any>{
        
        const insertData = new veh_types(body);
        var data = insertData.toJSON();
        delete data["id"];
        var result = await veh_types.create(data)
        console.log(result)
        return true
    }

    async updateType(body:any):Promise<any>{

        const parsedData = new veh_types(body);
        var updateData = parsedData.toJSON();
        var typeId = updateData.id;
        delete updateData["id"]
        var result = await veh_types.update(updateData,{where: {id: typeId}})
        return result
    }

    async deleteType(id:number):Promise<any>{

        var result = await veh_types.destroy({where: {id}})
        return result
    }


}
