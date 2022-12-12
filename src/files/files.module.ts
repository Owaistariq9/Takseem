import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesController } from './files.controller';
// import { FilesDataService } from './files.data.ervice';
import { FilesService } from './files.service';
// import { VehicleDocuments } from './models/vehicle-documents.model';
@Module({
  imports: [
    // SequelizeModule.forFeature([VehicleDocuments])
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
