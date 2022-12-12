import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { response } from 'src/helpers/helper-functions';
import { Constants } from '../core/constants/constants';
import { User } from '../users/user.model';
import { UsersService } from '../users/user.service';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companyService: CompaniesService
    ) { }

    @MessagePattern("getAll")
    async getAll(@Payload() companyId: any) {
        const companies = await this.companyService.getAllCompanies();
        return { companies: companies }
    }

    @MessagePattern("getbyID")
    async getbyID(@Payload() companyId: any) {
        const companies = await this.companyService.getByID(companyId);
        return { company: companies }
    }

    @MessagePattern("getLocations")
    async getAddress(@Payload() companyId: any) {
        const addresses = await this.companyService.getCompanyLocations(companyId);
        return { addresses: addresses }
    }

    @MessagePattern("verifyCode")
    async verifyCode(@Payload() code: any) {
        const data = await this.companyService.verifyCompanyCode(code);
        if (!data) {
            throw new RpcException(new BadRequestException("Invalid company code"));
        }
        return response(true, 200, `Company Verified: ${data.company.name}`, data);
    }

    @MessagePattern("getCompanyAddressById")
    async getCompanyAddressById(@Payload() id: any) {
        return await this.companyService.getCompanyLocationById(id);
    }



}
