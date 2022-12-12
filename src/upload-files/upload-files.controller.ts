import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { Express } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('upload')
export class UploadFilesController {
    constructor(private readonly uploadFileService: UploadFilesService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            file: {
            type: 'string',
            format: 'binary',
            },
        },
        },
    })
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req:any) {
        return await this.uploadFileService.uploadFile(file, req.user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("files")
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            files: {
            type: 'array',
            items: {
                type: 'string',
                format: 'binary',
            },
            },
        },
        },
    })
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req:any) {
        return await this.uploadFileService.uploadFiles(files, req.user);
    }

}
