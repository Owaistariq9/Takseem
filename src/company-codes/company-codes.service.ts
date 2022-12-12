import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyCodes } from './company-codes.model';

@Injectable()
export class CompanyCodesService {
    constructor(
        @InjectModel(CompanyCodes) private readonly companyCodesModel: typeof CompanyCodes
    ) { }

    async getCodeByCompanyId(company_id: number) {
        try {
            const code: any = await this.companyCodesModel.findOne({
                raw: true,
                where: {
                    company_id
                },
            });
            if (code) {
                return code;
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
