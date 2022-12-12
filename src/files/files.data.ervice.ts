// import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { RpcException } from '@nestjs/microservices';
// import { InjectModel } from '@nestjs/sequelize';
// import { Config } from 'src/core/config/config';
// import { VehicleDocuments } from './models/vehicle-documents.model';

// @Injectable()
// export class FilesDataService {
//     constructor(
//         @InjectModel(VehicleDocuments) private readonly vehicleDocumentsModel: typeof VehicleDocuments
//     ) {}

//     async addVehicleDocument(obj: VehicleDocuments) {
//     try{
//         return await this.vehicleDocumentsModel.create(obj);
//     }
//     catch(err){
//         console.log(err);
//         throw new RpcException(new InternalServerErrorException("Something went wrong in addVehicleDocument"));
//     }
//     }
// }
