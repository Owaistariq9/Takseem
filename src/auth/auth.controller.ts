import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from 'src/core/constants/constants';
import { response } from 'src/helpers/helper-functions';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly usersService: UsersService,
      private readonly authService: AuthService
   ) { }

   //  @Post('/login')
   @MessagePattern("login")
   async login(@Payload() body: any) {
      if (!body.password) {
         throw new RpcException(new UnauthorizedException("User credentials invalid"));
      }
      if (body.phone) {
         let userPhone = body.phone;
         let userPassword = body.password;
         let user = await this.authService.validateUserByPhone(userPhone, userPassword);
         if (!user) {
            throw new RpcException(new UnauthorizedException("User credentials invalid"));
         }
         const data = await this.authService.login(user, body.token);
         return response(true, 200, "Logged in successfully", data);
      }
      if (!body.email) {
         throw new RpcException(new UnauthorizedException("User credentials invalid"));
      }
      let userEmail = body.email;
      let userPassword = body.password;
      let user = await this.authService.validateUser(userEmail, userPassword);
      if (!user) {
         throw new RpcException(new UnauthorizedException("User credentials invalid"));
      }
      const data = await this.authService.login(user, body.token);
      return response(true, 200, "Logged in successfully", data);
   }

   //  @Post('/signup')
   @MessagePattern("signup")
   async singup(
      @Payload() user: any
   ) {
      return await this.authService.signup(user);
   }

   @MessagePattern("existingUser")
   async existingUser(@Payload() user: any) {
      return this.authService.existingUser(user);
   }

   @MessagePattern("verifyOtp")
   async verifyOtp(@Payload() body: any) {
      const data = await this.authService.getOtpByPhone(body.phone, body.code);
      if (!data) {
         throw new RpcException(new BadRequestException("Invalid otp code"))
      }
      return response(true, 200, "Otp Verified", {});
   }

   @MessagePattern("updatePasswordFromPhone")
   async updatePasswordFromPhone(@Payload() body: any) {
      const data = await this.authService.updatePasswordFromPhone(body.password, body.phone, body.code);
      if (!data) {
         throw new RpcException(new BadRequestException("Invalid phone or code"))
      }
      return response(true, 200, "Password Successfully Updated", {});
   }
}
