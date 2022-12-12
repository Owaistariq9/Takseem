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
  HttpException,
  Put
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { userDTO } from './user.dto';
import { UsersService } from './user.service';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getUserData(@Request() req: any) {
    try {
      let id = req.user.id;
      return await this.usersService.profile(id);
    }
    catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("profile")
  async updateUserProfile(@Request() req: any) {
    try {
      req.body.id = req.user.id;
      return await this.usersService.updateUserProfile(req.body);
    }
    catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("vehicles")
  async getUserVehicles(@Request() req: any) {
    try {
      return await this.usersService.getUserVehicles(req.user.id);
    }
    catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // @Post("reset-password")
  // async resetPassword(@Body('email') email:string){
  //   try{
  //     return await this.usersService.resetPassword(email);
  //   }
  //   catch(err){
  //     return err;
  //   }
  // }

  // @Get("reset-password/:token")
  // async checkResetPassword(@Param('token') token: string){
  //   try{
  //     return await this.usersService.checkForgetPasswordToken(token);
  //   }
  //   catch(err){
  //     throw new HttpException(err.response,err.status);
  //   }
  // }

  // @Post("reset-password/:token")
  // async changePassword(@Param('token') token: string,
  // @Request() req:any){
  //   try{
  //     let data = {
  //       token: token,
  //       email: req.body.email,
  //       password: req.body.password
  //     }
  //     return await this.usersService.changePassword(data);
  //   }
  //   catch(err){
  //     throw new HttpException(err.response,err.status);
  //   }
  // }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post("update-password")
  // async updatePassword(@Request() req:any){
  //   try{
  //     let data = {
  //       user: req.user,
  //       body: req.body
  //     }
  //     return await this.usersService.updatePassword(data);
  //   }
  //   catch(err){
  //     throw new HttpException(err.response,err.status);
  //   }
  // }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('update-profile')
  // async updateUserProfile(@Request() req:any,@Body() userUpdateProfile:any) {
  //   try{
  //     let data = {
  //       user: req.user,
  //       userUpdateProfile: userUpdateProfile
  //     }
  //     return await this.usersService.updateUserProfile(data);
  //   }
  //   catch(err){
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

}