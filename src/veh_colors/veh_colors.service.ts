import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import  {veh_colors}  from '../models/veh_colors.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VehColorService {
    private notificationService: ClientProxy
    constructor(
        @InjectModel(veh_colors) private readonly vehColor: typeof veh_colors
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
        
        return await this.vehColor.findAll({});

    }

    async create(body: any):Promise<any>{
        
        const insertData = new veh_colors(body);
        var data = insertData.toJSON();
        delete data["id"];
        var result = await veh_colors.create(data)
        console.log(result)
        return true
    }

    async update(body:any):Promise<any>{

        const parsedData = new veh_colors(body);
        var updateData = parsedData.toJSON();
        var typeId = updateData.id;
        delete updateData["id"]
        var result = await veh_colors.update(updateData,{where: {id: typeId}})
        return result
    }

    async delete(id:number):Promise<any>{

        var result = await veh_colors.destroy({where: {id}})
        return result
    }


}
