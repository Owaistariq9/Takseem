import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { Config } from 'src/core/config/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { company_codes } from 'src/models/company_codes.model';
import { CompanyUsersMeta } from 'src/models/company_users_meta.model';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: Config.smtp_host,
          secure: false,
          auth: {
            user: Config.smtp_email,
            pass: Config.smtp_password,
          },
        },
        defaults: {
          from: Config.smtp_name
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    }),
    SequelizeModule.forFeature([company_codes, CompanyUsersMeta])
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }
