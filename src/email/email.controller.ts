import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @MessagePattern("sendCompanyCodeMail")
    async sendCompanyCodeMail(@Payload() body: any) {
        return this.emailService.sendCompanyCodeMail(body);
    }
}
