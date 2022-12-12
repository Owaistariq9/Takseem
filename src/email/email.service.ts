import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Config } from 'src/core/config/config';
import { response } from 'src/helpers/helper-functions';
import { company_codes } from 'src/models/company_codes.model';
import { CompanyUsersMeta } from 'src/models/company_users_meta.model';

@Injectable()
export class EmailService {
    constructor(
        private mailerService: MailerService,
        @InjectModel(company_codes) private readonly companyCodeModel: typeof company_codes,
        @InjectModel(CompanyUsersMeta) private readonly companyUsersMetaModel: typeof CompanyUsersMeta
    ) { }

    async sendOPTMail(email: string, minutes: string, otp1: string, otp2: string, otp3: string, otp4: string) {
        try {
            let data = await this.mailerService.sendMail({
                to: email,
                subject: 'OTP from Takseem',
                from: Config.smtp_email,
                template: 'otp.html',
                context: {
                    otp1,
                    otp2,
                    otp3,
                    otp4,
                    minutes
                }
            });
            return "Email sent successfully";
        } catch (error) {
            console.log(error);
            throw new RpcException(new HttpException("Something went wrong sending OTP email", 500));
        }
    }

    async sendCompanyCodeMail(body: any) {
        try {
            const searchParam = body.search;
            const findUser = await this.companyUsersMetaModel.findOne({ where: { [Op.or]: [{ email: searchParam }, { employee_id: searchParam }, { phone: searchParam }] } });
            if (findUser) {
                const companyCode = await this.companyCodeModel.findOne({ where: { company_id: findUser.company_id } })
                if (!companyCode) {
                    throw new RpcException(new BadRequestException("You are not registered with any company!"));
                }
                else {
                    let data = await this.mailerService.sendMail({
                        to: findUser.email,
                        subject: 'Request for Company Code',
                        from: Config.smtp_email,
                        template: 'company_code.html',
                        context: {
                            otp1: companyCode.code[0],
                            otp2: companyCode.code[1],
                            otp3: companyCode.code[2],
                            otp4: companyCode.code[3],
                            otp5: companyCode.code[4],
                            otp6: companyCode.code[5]
                        }
                    });
                }
            }
            else {
                throw new RpcException(new BadRequestException("You are not registered with any company!"));
            }
            return response(true, 200, "Invitation code has been sent to your registered email/phone", {});
        } catch (error) {
            console.log(error);
            throw new RpcException(new HttpException("Something went wrong sending OTP email", 500));
        }
    }

}
