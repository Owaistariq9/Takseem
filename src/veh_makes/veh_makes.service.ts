import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import  {veh_makes}  from '../models/veh_makes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VehMakeService {
    private notificationService: ClientProxy
    constructor(
        @InjectModel(veh_makes) private readonly vehMakeModel: typeof veh_makes
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
        
        return await this.vehMakeModel.findAll({include: ["type"]});

    }

    async createType(body: any):Promise<any>{
        
        const insertData = new veh_makes(body);
        var data = insertData.toJSON();
        delete data["id"];
        var result = await veh_makes.create(data)
        console.log(result)
        return true
    }

    async updateType(body:any):Promise<any>{

        const parsedData = new veh_makes(body);
        var updateData = parsedData.toJSON();
        var typeId = updateData.id;
        delete updateData["id"]
        var result = await veh_makes.update(updateData,{where: {id: typeId}})
        return result
    }

    async deleteType(id:number):Promise<any>{

        var result = await veh_makes.destroy({where: {id}})
        return result
    }


}
