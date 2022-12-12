import { Injectable, NotFoundException, NotAcceptableException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersDataService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) { }

  async singup(userObj: User) {
    try {
      const newUser: any = await this.userModel.create(userObj);
      return newUser;
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong while signing up"));
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user: any = await this.userModel.findOne({
        where: {
          email
        },
      });
      if (user) {
        return user.dataValues;
      }
      else {
        return null;
      }
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong in getUserByEmail"));
    }
  }

  async getUserByPhone(phone: string) {
    try {
      const user: any = await this.userModel.findOne({
        where: {
          phone
        },
      });
      if (user) {
        return user.dataValues;
      }
      else {
        return null;
      }
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong in getUserByEmail"));
    }
  }

  async updateUserPasswordByPhone(phone: string, password: string) {
    try {
      const user = await this.userModel.update(
        {
          password: password
        },
        {
          where: {
            phone
          }
        }
      )
      return user;
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong in getUserByEmail"));
    }
  }

  async getUserById(id: string) {
    try {
      const user: any = await this.userModel.findOne({
        where: {
          id
        },
      });
      return user;
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong in getUserById"));
    }
  }

  async updateUserById(id: number, obj: any) {
    try {
      if (obj.id) {
        delete obj.id;
      }
      const user = await this.userModel.update(
        obj,
        {
          where: {
            id
          }
        }
      )
      return user;
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new InternalServerErrorException("Something went wrong in updateUserById"));
    }
  }


}