import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';
import { Config } from 'src/core/config/config';
import { userDTO } from 'src/users/user.dto';

@Injectable()
export class AuthService {
    private client: ClientProxy;
    private notificationMicroservice: ClientProxy;
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.auth_microservice_host,
                port: Config.auth_microservice_port,
            },
        });
        this.notificationMicroservice = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.notification_microservice_host,
                port: Config.notification_microservice_port,
            },
        });
    }

    async login(body: any) {
        try {
            let x = this.client.send<any>("login", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async signup(userObj: any) {
        try {
            let x = this.client.send<any>("signup", userObj).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async existingUser(userObj: any) {
        try {
            let x = this.client.send<any>("existingUser", userObj).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async logout(token: any) {
        try {
            let x = this.notificationMicroservice.send<any>("deleteToken", token).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async testPhone() {
        try {
            let x = this.notificationMicroservice.send<any>("testPhoneOtp", {}).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async forgetPassword(body: any) {
        try {
            let x = this.notificationMicroservice.send<any>("forgetPassword", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async verifyOtp(body: any) {
        try {
            let x = this.notificationMicroservice.send<any>("verifyOtp", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }

    async updatePasswordFromPhone(body: any) {
        try {
            let x = this.notificationMicroservice.send<any>("verifyOtp", body).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }));
            return x;
        }
        catch (err) {
            console.log("error", err);
            return err;
        }
    }
}
