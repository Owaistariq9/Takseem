import { BadRequestException, Body, Controller, Headers, Post, Put, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ExceptionFilter } from 'src/rpc-exception.filter';
import { userDTO } from 'src/users/user.dto';
import { authDTO, forgetPasswordDTO, updatePasswordFromPhoneDTO, verifyCodeDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() body: authDTO) {
        return this.authService.login(body);
    }

    @Post('/register')
    async singup(
        @Body() user: any
    ) {
        const createdUser = this.authService.signup(user);
        return createdUser;
    }

    @Post('/exist-user')
    async existingUser(
        @Body() user: any
    ) {
        const createdUser = this.authService.existingUser(user);
        return createdUser;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Body() body: any) {
        if (!body.fcmToken) {
            throw new BadRequestException("Missing Fields fcmToken");
        }
        return this.authService.logout(body.fcmToken);
    }

    @Post('/test-phone')
    async test(@Body() body: any) {
        return this.authService.testPhone();
    }

    @Post('/forget-password')
    async forgetPassword(@Body() body: forgetPasswordDTO) {
        // if(!body.email && !body.phone){
        //     throw new BadRequestException("Missing fields email or phone")
        // }
        return this.authService.forgetPassword(body);
    }

    @Post('/verify-code')
    async verifyOtp(@Body() body: verifyCodeDTO) {
        // if(!body.code || !body.phone){
        //     throw new BadRequestException("Missing fields code or phone")
        // }
        return this.authService.verifyOtp(body);
    }

    @Put('/password')
    async updatePasswordFromPhone(@Body() body: updatePasswordFromPhoneDTO) {
        return this.authService.updatePasswordFromPhone(body);
    }
}
