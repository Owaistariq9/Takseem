import { Injectable, NotFoundException, NotAcceptableException, BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersDataService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  async singup(userObj: User) {
    try{
      const newUser = this.userModel.create(userObj);
      return newUser;
    }
    catch(err){
        return err
    }
}
async getUserByEmail(email: string) {
    try{
      const user = await this.userModel.findOne({
        where: {
            email
        },
    });
      return user
    }
    catch(err){
      return err
    }
}
async getUserById(id: string) {
    try{
      const user = await this.userModel.findOne({
        where: {
            id
        },
    });
      return user
    }
    catch(err){
      return err
    }
}
// async getForgetPasswordToken(token:string){
//     let user = await this.userModel.findOne({forgetPasswordToken:token}).lean().exec();
//     if(!user){
//       throw new RpcException(new NotFoundException("Invalid Token"));
//     }
//     return user;
//   }

// async updateUserObject(_id:string,userObj:any){
//     let user = await this.userModel.findOneAndUpdate({_id},{$set:userObj},{new:true}).lean().exec();
//     if(!user){
//       throw new RpcException(new NotFoundException("Invalid Token"));
//     }
//     return user;
//   }

}