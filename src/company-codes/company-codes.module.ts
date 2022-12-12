import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyCodes } from './company-codes.model';
import { CompanyCodesService } from './company-codes.service';

@Module({
  imports: [SequelizeModule.forFeature([CompanyCodes])],
  providers: [CompanyCodesService],
  exports: [CompanyCodesService]
})
export class CompanyCodesModule { }
