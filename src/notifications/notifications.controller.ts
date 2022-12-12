import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { response } from 'src/helpers/helper-functions';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService
    ) { }


    @MessagePattern("getUserNotifications")
    async getUserNotifications(@Payload() body: any) {
        return await this.notificationsService.getUserNotifications(body.userId, body.page, body.limit);
    }

    @MessagePattern("updateSeenNotification")
    async updateSeenNotification(@Payload() body: any) {
        return await this.notificationsService.updateSeenNotifications(body.id, body.isSeen);
    }

    @MessagePattern("updateAllSeenNotification")
    async updateAllSeenNotification(@Payload() body: any) {
        return await this.notificationsService.updateAllSeenNotifications(body.userId, body.isSeen);
    }

    @MessagePattern("getIsSeenNotificationsCount")
    async getIsSeenNotificationsCount(@Payload() body: any) {
        return await this.notificationsService.getIsSeenNotificationsCount(body.userId);
    }

    @MessagePattern("getUserNotificationsByType")
    async getUserNotificationsByType(@Payload() body: any) {
        return await this.notificationsService.getUserNotificationsByType(body.userId, body.userType, body.page, body.limit);
    }

    @MessagePattern("updateRideRequestNotification")
    async updateRideRequestNotification(@Payload() body: any) {
        if (body.status === "accept") {
            const noti = await this.notificationsService.updateToAcceptRideRequestNotification(body.id);
            return response(true, 200, "Updated Ride Request Notification", noti);
        }
        else if (body.status === "reject") {
            const noti = await this.notificationsService.updateToRejectRideRequestNotification(body.id);
            return response(true, 200, "Updated Ride Request Notification", noti);
        }
        else {
            throw new RpcException(new BadRequestException("Status can only be accept or reject"));
        }
    }
}
