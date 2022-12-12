import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { OtpCodes } from './otp_code.model';

@Injectable()
export class OtpCodeDataService {
  constructor(
    @InjectModel(OtpCodes) private readonly otpCodesModel: typeof OtpCodes,
    @InjectModel(User) private readonly userModel: typeof User
  ) { }

  async addOtpCode(Obj: any) {
    try {
      const code = this.otpCodesModel.create(Obj);
      return code;
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new HttpException("Something went wrong with addOtpCode", 500));
    }
  }

  async getCodeByEmail(user_email: string) {
    try {
      const code = await this.otpCodesModel.findOne({
        where: {
          user_email
        },
      });
      return code
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new HttpException("Something went wrong with getCodeByEmail", 500));
    }
  }

  async getCodeByPhone(user_phone: string) {
    try {
      const code = await this.otpCodesModel.findOne({
        where: {
          user_phone
        },
      });
      return code
    }
    catch (err) {
      console.log(err);
      throw new RpcException(new HttpException("Something went wrong with getCodeByPhone", 500));
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

}
