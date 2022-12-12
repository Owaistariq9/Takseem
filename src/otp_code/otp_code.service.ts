import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { OtpCodeDataService } from './otp_code.data.service';
import moment from 'moment';
import { EmailService } from 'src/email/email.service';
import { Constants } from 'src/core/constants/constants';
import axios from 'axios';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OtpCodeService {
    constructor(
        private otpCodeDataService: OtpCodeDataService,
        private emailService: EmailService
    ) { }

    generateOTP() {
        // Declare a digits variable 
        // which stores all digits
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    async addOtpCode(obj: any) {
        // obj.code = Math.floor(Math.random() * 10000).toString();
        obj.code = this.generateOTP();
        const code = obj.code.split("");
        const newexpTime = moment().add(Constants.otpExpiryMinutes, "m").format('YYYY-MM-DD HH:mm:ss');
        obj.expired_at = newexpTime;
        obj.session_id = (Math.random() + 1).toString(36).substring(2);
        await this.emailService.sendOPTMail(obj.user_email, Constants.otpExpiryMinutes.toString(), code[0], code[1], code[2], code[3]);
        return this.otpCodeDataService.addOtpCode(obj);
    }

    async getCodeByEmail(email: string) {
        return this.otpCodeDataService.getCodeByEmail(email);
    }

    async getCodeByPhone(phone: string) {
        return this.otpCodeDataService.getCodeByPhone(phone);
    }

    async sendRegistrationCodeToPhone(number: string, otpcode: string, minutes: string) {
        var msg = "Takseem - Your One Time Password for Registration is " + otpcode + ". This code will get expired within " + minutes + " minutes of requested time"
        var num = "+92" + number.substring(2);
        var config = {
            method: 'get',
            url: `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=1d07ca168f204b53bfb985f2dd6c2355&msg=${msg}&mobileno=${num}`,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return JSON.stringify(response.data);
            })
            .catch(function (error) {
                console.log(error);
                throw new RpcException(new HttpException("Something went wrong with sendRegistrationCodeToPhone", 500));
            });
    }

    async sendForgetPasswordCodeToPhone(number: string, otpcode: string, minutes: string) {
        var msg = "Takseem - Your One Time Password for update password is " + otpcode + ". This code will get expired within " + minutes + " minutes of requested time"
        var num = "+92" + number.substring(2);
        var config = {
            method: 'get',
            url: `https://bsms.telecard.com.pk/SMSportal/Customer/apikey.aspx?apikey=1d07ca168f204b53bfb985f2dd6c2355&msg=${msg}&mobileno=${num}`,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return JSON.stringify(response.data);
            })
            .catch(function (error) {
                console.log(error);
                throw new RpcException(new HttpException("Something went wrong with sendRegistrationCodeToPhone", 500));
            });
    }

    async forgetPassword(body: any) {
        let user;
        if (body.email) {
            user = await this.otpCodeDataService.getUserByEmail(body.email);
        }
        else if (body.phone) {
            user = await this.otpCodeDataService.getCodeByPhone(body.phone);
        }
        else {
            throw new RpcException(new BadRequestException("No user registered with this phone or email"));
        }
        let otpObj: any = {
            user_email: user.email,
            user_phone: user.phone,
            api_name: "forget-password"
        }
        // otpObj.code = Math.floor(Math.random() * 10000).toString();
        otpObj.code = this.generateOTP();
        const newexpTime = moment().add(Constants.otpExpiryMinutes, "m").format('YYYY-MM-DD HH:mm:ss');
        otpObj.expired_at = newexpTime;
        otpObj.session_id = (Math.random() + 1).toString(36).substring(2);
        await this.otpCodeDataService.addOtpCode(otpObj);
        return await this.sendForgetPasswordCodeToPhone(user.phone, otpObj.code, Constants.otpExpiryMinutes);
    }
}
