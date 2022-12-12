import { Injectable, NotFoundException, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as crypto from 'crypto';
import * as randomString from 'randomstring';
import { Config } from 'src/core/config/config';
import { UsersDataService } from './user.data.service';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDataService: UsersDataService
  ) { }

  async singup(userObj: User) {
    try {
      const newUser = await this.usersDataService.singup(userObj);
      return newUser;
    }
    catch (err) {
      return err
    }
  }

  async encryptPassword(password: string) {
    if (!password) {
      throw new RpcException(new BadRequestException("Missing Password Field"));
    }
    const algorithm = Config.algorithm;
    const secret: any = Config.secret;
    const encrypted = crypto.createHash(algorithm, secret).update(password).digest('hex');
    return encrypted;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersDataService.getUserByEmail(email);
    if (!user) {
      return null
    }
    return user
  }

  async getUserByPhone(phone: string) {
    const user = await this.usersDataService.getUserByPhone(phone);
    if (!user) {
      return null
    }
    return user
  }

  async updateUserPasswordByPhone(phone: string, password: string) {
    return await this.usersDataService.updateUserPasswordByPhone(phone, password);
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersDataService.getUserById(id);
      return user
    }
    catch (err) {
      return err
    }
  }

  async updateUserById(id: number, obj: any) {
    return await this.usersDataService.updateUserById(id, obj);
  }

  //   async forgetPasswordToken(email:string){
  //     let user = await this.usersDataService.getUserByEmail(email);
  //     if(!user){
  //       throw new RpcException(new NotFoundException("Invalid email"));
  //     }
  //     const token = randomString.generate();
  //     user.forgetPasswordToken = token;
  //     user.forgetPasswordTime = Date.now();
  //     let updatedUser = await this.usersDataService.updateUserObject(user._id,user);
  //     return updatedUser.forgetPasswordToken;
  //   }

  //   async checkForgetPasswordToken(token:string){
  //     let user = await this.usersDataService.getForgetPasswordToken(token);
  //     let tokenTime:any = user.forgetPasswordTime;
  //     let currentTime = Date.now();
  //     let timeExpiry = (currentTime-tokenTime)/1000/60;
  //     if(timeExpiry >= 1){
  //       throw new RpcException(new NotAcceptableException("Token expired"));
  //     }
  //     return user;
  //   }

  //   async changePassword(email:string,password:string){
  //     let user = await this.usersDataService.getUserByEmail(email);
  //     if(!user){
  //       throw new RpcException(new NotFoundException("Invalid Email"));
  //     }
  //     user.password = password;
  //     let updatedUser = await this.usersDataService.updateUserObject(user._id,user);
  //     return updatedUser;
  //   }

  //   async checkOldPassword(email:string,oldPassword:string){
  //     let user = await this.usersDataService.getUserByEmail(email);
  //     if(!user){
  //       throw new RpcException(new NotFoundException("Invalid Email"));
  //     }
  //     if(user.password === oldPassword){
  //       return true;
  //     }
  //     else{
  //       throw new RpcException(new BadRequestException("Invalid email or password"));
  //     }
  //   }

}
