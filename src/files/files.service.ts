import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Config } from 'src/core/config/config';
import * as AWS from "aws-sdk";
import * as crypto from "crypto";
import { determineUserRole } from 'src/core/constants/constants';
// import { FilesDataService } from './files.data.ervice';
// import { VehicleDocuments } from './models/vehicle-documents.model';

@Injectable()
export class FilesService {
    // constructor(private fileDataService: FilesDataService) {}
    
    s3 = new AWS.S3
    ({
        accessKeyId: Config.aws_access_key,
        secretAccessKey: Config.aws_secret_key,
    });

    async s3_upload(fileBuffer: String, name: String, user: any)
    {
        const id = crypto.randomBytes(16).toString("hex");
        const params: any = 
        {
            Bucket: Config.aws_bucket,
            Key: determineUserRole(user.role_id) + "-" + user.id + "/" + id + "-" + name,
            Body: Buffer.from(fileBuffer),
            // ACL: "public-read",
            // ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: Config.aws_region
            }
        };

        try
        {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        }
        catch (err)
        {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in s3_upload"));
        }
    }

    async s3_multipleUploads(fileBuffer: any, name: any, user: any)
    {
        for (let i = 0; i < fileBuffer.length; i++) {
            const id = crypto.randomBytes(16).toString("hex");
            const params: any = 
            {
                Bucket: Config.aws_bucket,
                Key: "user-1/"+id+"-"+name[i],
                Body: Buffer.from(fileBuffer[i]),
                // ACL: "public-read",
                // ContentDisposition:"inline",
                CreateBucketConfiguration: 
                {
                    LocationConstraint: Config.aws_region
                }
            };

            try
            {
                let s3Response = await this.s3.upload(params).promise();
                return s3Response;
            }
            catch (err)
            {
                console.log(err);
                throw new RpcException(new InternalServerErrorException("Something went wrong in s3_multipleUploads"));
            }
        }
    }

    // async uploadVehicleDocuments(file: String, obj: any) {
    //     const aws_s3_response = await this.s3_upload(file, obj.document_name);
    //     obj.document_url = aws_s3_response.Location;
    //     // return await this.fileDataService.addVehicleDocument(obj);
    // }

}
