import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FcmService } from './fcm.service';

@Controller('fcm')
export class FcmController {
    constructor(private readonly fcmService: FcmService) { }

    @MessagePattern("test")
    async fcmTest(@Payload() body: any) {
        return this.fcmService.sendNotification(body);
    }

    @MessagePattern("addFcmToken")
    async addFcmToken(@Payload() body: any) {
        return this.fcmService.insertDeviceToken(body.userId, body.token);
    }

    @MessagePattern("sendNotificationToAllDevices")
    async sendNotificationToAllDevices(@Payload() body: any) {
        return this.fcmService.sendNotificationsToMultipleDevices(body);
    }

    @MessagePattern("sendNotificationsToMultipleUsers")
    async sendNotificationsToMultipleUsers(@Payload() body: any) {
        return this.fcmService.sendNotificationsToMultipleUsers(body);
    }

    @MessagePattern("deleteToken")
    async deleteToken(@Payload() body: any) {
        return this.fcmService.deleteToken(body);
    }
}
