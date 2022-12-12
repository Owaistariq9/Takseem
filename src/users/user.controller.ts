import {
    Controller,
    Post,
    Body,
    Request,
    Get,
    Param,
    Patch,
    Delete,
    BadRequestException,
    UseGuards,
    InternalServerErrorException,
    NotFoundException,
    HttpException
  } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
// import { userDTO } from './user.dto';
import { UsersService } from './user.service';
  
  @Controller("users")
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

//     // @Post("reset-password")
//     @MessagePattern("reset-password")
//     async resetPassword(@Payload() email:string){
//       try{
//         const token = await this.usersService.forgetPasswordToken(email);
//         if(!token){
//           throw new RpcException(new NotFoundException('Invalid Email'));
//         }
//         return{
//           url:'http://localhost:3000/users/reset-password/'+token
//         }
//       }
//       catch(err){
//         return err;
//       }
//     }

//     // @Get("reset-password/:token")
//     @MessagePattern("checkResetPassword")
//     async checkResetPassword(@Payload() token: string){
//       try{
//         const user = await this.usersService.checkForgetPasswordToken(token);
//         return {"email":user.email};
//       }
//       catch(err){
//         throw new RpcException(new HttpException(err.response,err.status));
//       }
//     }

//     // @Post("reset-password/:token")
//     @MessagePattern("changePassword")
//     async changePassword(@Payload() data: any){
//       try{
//         const user = await this.usersService.checkForgetPasswordToken(data.token);
//         let encryptedPassword = await this.usersService.encryptPassword(data.password);
//         const newUser = await this.usersService.changePassword(data.email,encryptedPassword);
//         if(newUser){
//           return "Password Updated"
//         }
//       }
//       catch(err){
//         throw new RpcException(new HttpException(err.response,err.status));
//       }
//     }

//     // @UseGuards(JwtAuthGuard)
//     // @Post("update-password")
//     @MessagePattern("updatePassword")
//     async updatePassword(@Payload() req:any){
//       try{
//         const user:userDTO = await this.usersService.getUserById(req.user._id);
//         let oldEncryptedPassword = await this.usersService.encryptPassword(req.body.oldPassword);
//         let newEncryptedPassword = await this.usersService.encryptPassword(req.body.newPassword);
//         let check = await this.usersService.checkOldPassword(user.email,oldEncryptedPassword);
//         if(check == true){
//           let newUser = await this.usersService.changePassword(user.email,newEncryptedPassword);
//           return "Password Updated";
//         }
//       }
//       catch(err){
//         throw new RpcException(new HttpException(err.response,err.status));
//       }
//     }

//     // @UseGuards(JwtAuthGuard)
//     // @Post('update-profile')
//     @MessagePattern("updateUserProfile")
//     async updateUserProfile(@Payload() req:any) {
//       try{
//         return await this.usersService.updateUserProfile(req.user._id,req.userUpdateProfile);
//       }
//       catch(err){
//         throw new RpcException(new InternalServerErrorException(err.message));
//       }
//     }
  
//     // @UseGuards(JwtAuthGuard)
//     // @Get("profile")
//     // async getUserData(@Request() req:any,
//     // @Payload() userId:String) {
//     //   try{
//     //     let id = req.user._id || userId ;
//     //     const user:userDTO = await this.usersService.getUserById(id);
//     //     user.password = null;
//     //     return user;
//     //   }
//     //   catch(err){
//     //     throw new InternalServerErrorException(err.message);
//     //   }
//     // }
    
//     @MessagePattern("profile")
//     async getUserProfile(
//     @Payload() userId:string) {
//       try{
//         const user:userDTO = await this.usersService.getUserById(userId);
//         user.password = null;
//         return user;
//       }
//       catch(err){
//         throw new RpcException(new InternalServerErrorException(err.message));
//       }
//     }
  }