import { Injectable, NotFoundException, NotAcceptableException, BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import * as crypto from 'crypto';
import * as randomString from 'randomstring';
import { catchError } from 'rxjs';
import { Config } from 'src/core/config/config';

@Injectable()
export class UsersService {
  private dashboardMicroservice: ClientProxy;
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: Config.auth_microservice_host,
        port: Config.auth_microservice_port,
      },
    });
    this.dashboardMicroservice = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: Config.dashboard_microservice_host,
        port: Config.dashboard_microservice_port,
      },
    });
  }

  async resetPassword(email: string) {
    try {
      let x = this.client.send<any>("reset-password", email).pipe(catchError(val => {
        throw new HttpException(val.response, val.status);
      }));
      return x;
    }
    catch (err) {
      return err;
    }
  }

  async checkForgetPasswordToken(token: string) {
    let x = this.client.send<any>("checkResetPassword", token).pipe(catchError(val => {
      throw new HttpException(val.response, val.status);
    }));
    return x;
  }

  async changePassword(data: any) {
    let x = this.client.send<any>("changePassword", data).pipe(catchError(val => {
      throw new HttpException(val.response, val.status);
    }));
    return x;
  }

  async updatePassword(req: any) {
    let x = this.client.send<any>("updatePassword", req).pipe(catchError(val => {
      throw new HttpException(val.response, val.status);
    }));
    return x;
  }

  async updateUserProfile(data: any) {
    try {
      let x = this.client.send<any>("updateUserProfile", data).pipe(catchError(val => {
        throw new HttpException(val.response, val.status);
      }));
      return x;
    }
    catch (err) {
      console.log("error", err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async profile(id: number) {
    try {
      let x = this.client.send<any>("profile", id).pipe(catchError(val => {
        throw new HttpException(val.response, val.status);
      }));
      return x;
    }
    catch (err) {
      console.log("error", err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getUserVehicles(id: number) {
    try {
      let x = this.dashboardMicroservice.send<any>("getUserVehicles", id).pipe(catchError(val => {
        throw new HttpException(val.response, val.status);
      }));
      return x;
    }
    catch (err) {
      console.log("error", err);
      throw new InternalServerErrorException(err.message);
    }
  }

}
