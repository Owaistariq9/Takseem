import { Injectable } from '@nestjs/common';
import { NotificationsDataService } from './notifications.data.service';

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationDataService: NotificationsDataService) { }

    async insertNotification(userId: number, title: string, body: string, userType: string, data: any) {
        const stringObj = JSON.stringify(data);
        let obj = {
            userId,
            title,
            body,
            userType,
            data: stringObj
        }
        return await this.notificationDataService.insertNotification(obj);
    }

    async insertManyNotification(userIds: number[], title: string, body: string, userType: string, data: any) {
        const stringObj = JSON.stringify(data);
        let vals = [];
        userIds.forEach(x => {
            let obj = {
                userId: x,
                title,
                body,
                userType,
                data: stringObj
            }
            vals.push(obj);
        })
        return await this.notificationDataService.insertManyNotification(vals);
    }

    async getUserNotifications(userId: number, page: number, limit: number) {
        const skip = (page - 1) * limit;
        await this.notificationDataService.updateAllUsersIsSeenNotifications(userId, true);
        return await this.notificationDataService.getUserNotifications(userId, limit, skip);
    }

    async updateSeenNotifications(id: number, isSeen: boolean) {
        return await this.notificationDataService.updateNotificationIsSeen(id, isSeen);
    }

    async updateAllSeenNotifications(userId: number, isSeen: boolean) {
        return await this.notificationDataService.updateAllUsersIsSeenNotifications(userId, isSeen);
    }

    async getIsSeenNotificationsCount(userId: number) {
        return await this.notificationDataService.getIsSeenNotificationsCount(userId, false);
    }

    async getUserNotificationsByType(userId: number, userType: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const notifications = await this.notificationDataService.getUserNotificationsByUserType(userId, userType, limit, skip);
        if (!notifications.data[0]) {
            return notifications;
        }
        const ids = notifications.data.map(x => x.id);
        await this.notificationDataService.updateUsersIsSeenNotificationsByIdList(ids, true);
        return notifications;
    }

    async updateToAcceptRideRequestNotification(id: number) {
        let notification: any = await this.notificationDataService.getNotificationById(id);
        notification.data.type = "accept";
        const arr = notification.body.split(" ");
        let name = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === "has") {
                break;
            }
            else {
                name += " " + arr[i];
            }
        }
        notification.body = `You accepted ${name} as a passenger`;
        let val = notification.data;
        notification.data = JSON.stringify(val);
        await this.notificationDataService.updateRideRequestNotification(id, notification);
        return notification;
    }

    async updateToRejectRideRequestNotification(id: number) {
        let notification: any = await this.notificationDataService.getNotificationById(id);
        notification.data.type = "reject";
        const arr = notification.body.split(" ");
        let name = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === "has") {
                break;
            }
            else {
                name += " " + arr[i];
            }
        }
        notification.body = `You rejected ${name} as a passenger`;
        let val = notification.data;
        notification.data = JSON.stringify(val);
        await this.notificationDataService.updateRideRequestNotification(id, notification);
        return notification;
    }
}
