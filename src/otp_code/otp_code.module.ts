import { Module } from '@nestjs/common';
import { OtpCodeService } from './otp_code.service';
import { OtpCodeController } from './otp_code.controller';
import { OtpCodes } from './otp_code.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OtpCodeDataService } from './otp_code.data.service';
import { EmailModule } from 'src/email/email.module';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([OtpCodes, User]), EmailModule],
  providers: [OtpCodeService, OtpCodeDataService],
  controllers: [OtpCodeController]
})
export class OtpCodeModule { }
