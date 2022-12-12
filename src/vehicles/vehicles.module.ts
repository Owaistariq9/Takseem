import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { veh_types } from 'src/models/veh_types.model';
import { Vehicles } from 'src/models/vehicles.model';
import { veh_models } from 'src/models/veh_models.model';
import { veh_makes } from 'src/models/veh_makes.model';

@Module({
  imports: [SequelizeModule.forFeature([Vehicles, veh_models, veh_makes, veh_types])],
  providers: [VehiclesService],
  controllers: [VehiclesController]
})
export class VehiclesModule { }
