import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { catchError, interval, take } from 'rxjs';
import { Config } from '../core/config/config';
import { company_addresses } from '../models/company_addresses.model';
import { company_contactpersons } from '../models/company_contactpersons';
import { company_codes } from '../models/company_codes.model';
import { company_users_meta } from '../models/company_users_meta.model';
import { company_roles } from '../models/company_roles.model';
import { cities } from '../models/cities.model';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { companies } from 'src/models/companies.model';
import generator from 'generate-password'

@Injectable()
export class CompaniesService {
  private notificationService: ClientProxy
  constructor(
    @InjectModel(company_addresses) private readonly companyAddressModel: typeof company_addresses,
    @InjectModel(company_codes) private readonly companyCodesModel: typeof company_codes,
    @InjectModel(companies) private readonly companiesModel: typeof companies,
    @InjectModel(company_roles) private readonly companyRolesModel: typeof company_roles,
    @InjectModel(company_users_meta) private readonly companyUsersMetaModel: typeof company_users_meta,
    @InjectModel(company_contactpersons) private readonly company_contactpersonsModel: typeof company_contactpersons,
    private sequelize: Sequelize,

  ) {
    this.notificationService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: Config.vehicle_microservice_host,
        port: Config.vehicle_microservice_port,
      },
    });
  }

  async getAllCompanies(): Promise<any> {
    try {

      let company = await companies.findAll({
        attributes: { 
            include: [[this.sequelize.fn("COUNT", this.sequelize.col("users.id")), "employeeCount"]] 
        },
        include: [{
            model: User, attributes: []
        }],
        group: ['users.id'] 
    });

    return company
      
    } catch (error) {
      console.log(error)
      throw new RpcException(new HttpException(error.message || "Unable to create ride, Contact Support", 500));

    }
  }

  async getByID(companyId : any): Promise<any> {
    try {

     return await companies.findOne({ where: { id: companyId },
        include: [{model: company_addresses, include:[cities]},company_codes,{model: company_contactpersons, include: [company_roles]}] })
      
    } catch (error) {
      console.log(error)
      throw new RpcException(new HttpException(error.message || "Unable to get Details, Contact Support", 400));

    }
  }

  async getCompanyLocations(companyId: any): Promise<any> {
    try {

      var filterQuery = {
        ...companyId && { company_id: companyId },
      };
      return await company_addresses.findAll({ where: filterQuery });

    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async verifyCompanyCode(code: any): Promise<any> {
    try {

      return await this.companyCodesModel.findOne({ where: { code: code }, include: ["company"] });
      // return await this.companiesModel.findOne({ include: ["company_codes"] })

    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async getCompanyLocationById(id: number): Promise<any> {
    try {
      const companyLocation: any = await this.companyAddressModel.findOne({
        raw: true,
        where: { id: id }
      })
      return companyLocation;
    } catch (error) {
      console.log(error)
      return false;
    }
  }



  async getUsersMeta(companyID: number): Promise<any> {
    try {
      let filterQuery = {
        ...companyID && { company_id: companyID },
      };
      company_users_meta.findAll({where: filterQuery}).then(function (users) {
        if(users.length ==0) return false
        return users
      });
      
    } catch (error) {
      console.log(error)
      return false
    }
  }

a
  async addSingleUserMeta(data: any): Promise<any> {
    try {
      
      let userData = data;
      let result = await this.companyUsersMetaModel.create(userData)

    if (result) {
      return true

    }
    else{
      return false

    }


    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getCompanyRoles(): Promise<any> {
    try {
      this.companyRolesModel.findAll({}).then(function (roles) {
        return roles
      });
    } catch (error) {
      return false
    }
  }

  async checkGenerateCode(): Promise<any> {
    var code = generator.generate({
      length: 6,
      numbers: true,
      lowercase: false,
      uppercase: false
    });
    var result = await company_codes.findOne({ where: { code: code } })
  
    if (result) {
      this.checkGenerateCode()
    }
    else{
      return code
    }
  
  
    
  }
  

}
