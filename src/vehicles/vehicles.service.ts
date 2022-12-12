import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicles } from 'src/models/vehicles.model';
import { veh_makes } from 'src/models/veh_makes.model';
import { veh_models } from 'src/models/veh_models.model';
import { veh_types } from 'src/models/veh_types.model';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectModel(Vehicles) private readonly vehicleModel: typeof Vehicles
    ) { }

    async getUserVehicles(user_id: number): Promise<any> {
        try {
            const vehicles: any = await this.vehicleModel.findOne({
                include: [{
                    model: veh_models,
                    include: [{
                        model: veh_makes,
                        include: [{
                            model: veh_types
                        }]
                    }]
                }],
                where: { user_id: user_id }
            })
            return vehicles;

        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Error in getUserVehicles", 500));
        }
    }

}
