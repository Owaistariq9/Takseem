import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) 
    {}

    // @MessagePattern("upload-vehicle-documents")
    // async uploadVehicleDocuments( @Payload() obj: any) {
    //     return this.fileService.uploadVehicleDocuments(obj.file, obj.vehicleDocument);
    // }

    @MessagePattern("upload-file")
    async uploadFile( @Payload() obj: any) {
        return this.fileService.s3_upload(obj.file, obj.originalname, obj.user);
    }

    @MessagePattern("upload-files")
    async uploadFiles( @Payload() obj: any) {
        return this.fileService.s3_multipleUploads(obj.file, obj.originalname, obj.user);
    }
}
