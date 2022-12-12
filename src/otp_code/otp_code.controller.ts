import { Controller, HttpException } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Constants } from 'src/core/constants/constants';
import { response } from 'src/helpers/helper-functions';
import { OtpCodes } from './otp_code.model';
import { OtpCodeService } from './otp_code.service';

@Controller('otp-code')
export class OtpCodeController {
    constructor(private readonly otpCodeService: OtpCodeService) { }

    @MessagePattern("sendOtpCode")
    async sendOtpCode(@Payload() obj: any) {
        try {
            const otpObj = {
                user_email: obj.email,
                user_phone: obj.phone,
                api_name: "sign-up"
            }
            const otp = await this.otpCodeService.addOtpCode(otpObj);
            return await this.otpCodeService.sendRegistrationCodeToPhone(obj.phone, otp.code, Constants.otpExpiryMinutes)
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new HttpException("Something went wrong.", 500));
        }
    }

    @MessagePattern("testPhoneOtp")
    async testPhoneOtp(@Payload() body: any) {
        return await this.otpCodeService.sendRegistrationCodeToPhone("923122688698", "1234", "2");
    }

    @MessagePattern("forgetPassword")
    async forgetPassword(@Payload() body: any) {
        const data = await this.otpCodeService.forgetPassword(body);
        return response(true, 200, "Otp successfully sent to your phone or email", data);
    }

}
