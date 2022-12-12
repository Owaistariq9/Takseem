import { Controller, Get, Patch, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @UseGuards(JwtAuthGuard)
    @Get(":page/:limit")
    async getUserNotifications(@Request() req: any) {
        req.params.userId = req.user.id;
        return this.notificationsService.getUserNotifications(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":userType/:page/:limit")
    async getUserNotificationsByUserType(@Request() req: any) {
        req.params.userId = req.user.id;
        return this.notificationsService.getUserNotificationsByType(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Get("count")
    async getIsSeenNotificationsCount(@Request() req: any) {
        req.params.userId = req.user.id;
        return this.notificationsService.getIsSeenNotificationsCount(req.params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id/:status")
    async updateSeenNotification(@Request() req: any) {
        let params: any = {
            id: req.params.id
        };
        if (req.params.status === "false") {
            params.isSeen = false;
        }
        else {
            params.isSeen = true;
        }
        return this.notificationsService.updateSeenNotification(params);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/:status")
    async updateRideRequestNotification(@Request() req: any) {
        req.params.userId = req.user.id;
        return this.notificationsService.updateRideRequestNotification(req.params);
    }
}
