import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Config } from 'src/core/config/config';

@Injectable()
export class UploadFilesService {
    private uploadMicroservice: ClientProxy;
    constructor(){
        this.uploadMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              host: Config.upload_microservice_host,
              port: Config.upload_microservice_port,
            },
        });
    }

    async uploadFile(body: any, user: any){
        try{
            const obj = {
                file: body.buffer,
                originalname: body.originalname,
                user: user
            }
            let x = this.uploadMicroservice.send<any>("upload-file",obj).pipe(catchError(val => {
                throw new HttpException(val.response,val.status);
            }))
            return x;
        }
        catch(err){
            console.log("error",err);
            return err;
        }
    }

    async uploadFiles(body: any, user: any){
        try{
            const obj: any = {
                file: [],
                originalname: [],
                user: user
            }
            body.forEach(x => {
                obj.file.push(x.buffer);
                obj.originalname.push(x.originalname);
            });
            let x = this.uploadMicroservice.send<any>("upload-files",obj).pipe(catchError(val => {
                throw new HttpException(val.response,val.status);
            }))
            return x;
        }
        catch(err){
            console.log("error",err);
            return err;
        }
    }


}
