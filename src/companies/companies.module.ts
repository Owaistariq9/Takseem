import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { CompaniesService } from './companies.service';
import { cities } from '../models/cities.model';
import { companies } from '../models/companies.model';
import { company_contactpersons } from '../models/company_contactpersons';
import { company_addresses } from '../models/company_addresses.model';
import { company_users_meta } from '../models/company_users_meta.model';
import { company_roles } from '../models/company_roles.model';
import { User } from '../models/user.model';
import { CompaniesController } from './companies.controller';
import { Config } from '../core/config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { company_codes } from 'src/models/company_codes.model';

@Module({
  imports: [SequelizeModule.forFeature([cities,User,companies, company_contactpersons,company_addresses, company_codes, company_users_meta,company_roles])],
  providers: [CompaniesService],
  exports: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompanyModule { }
