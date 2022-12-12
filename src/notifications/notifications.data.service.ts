import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { response } from 'src/helpers/helper-functions';
import { Notifications } from './notifications.model';

@Injectable()
export class NotificationsDataService {
    constructor(
        @InjectModel(Notifications) private readonly notificationsModel: typeof Notifications
    ) { }

    async insertNotification(notification: any) {
        try {
            const obj: any = await this.notificationsModel.create(notification);
            return obj.dataValues;
        } catch (error) {
            console.log(error);
            throw new RpcException(new InternalServerErrorException("Something went wrong in insertNotification"))
        }
    }

    async insertManyNotification(notification: any) {
        try {
            const obj: any = await this.notificationsModel.bulkCreate(notification);
            let vals = [];
            obj.forEach(x => {
                vals.push(x.dataValues);
            });
            return vals;
        } catch (error) {
            console.log(error);
            throw new RpcException(new InternalServerErrorException("Something went wrong in insertManyNotification"))
        }
    }

    async getUserNotifications(userId: number, limit: any, offset: any) {
        try {
            const notifications = await this.notificationsModel.findAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                // raw: true,
                order: [['createdAt', 'DESC']],
                where: {
                    userId
                },
            });
            if (notifications[0]) {
                notifications.forEach(x => {
                    let val = x.data;
                    x.data = JSON.parse(val);
                })
                return response(true, 200, "All user notifications", notifications);
            }
            else {
                return response(true, 200, "No notifications available", {});
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getUserNotifications"));
        }
    }

    async getNotificationById(id: number) {
        try {
            const notifications = await this.notificationsModel.findOne({
                raw: true,
                where: {
                    id
                },
            });
            if (notifications) {
                let val = notifications.data;
                notifications.data = JSON.parse(val);
                return notifications
            }
            else {
                return null
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getNotificationById"));
        }
    }

    async updateNotificationIsSeen(id: number, isSeen: boolean) {
        try {
            const notifications = await this.notificationsModel.update(
                {
                    isSeen: isSeen
                },
                {
                    where: { id: id }
                }
            );
            if (notifications[0] !== 0) {
                return notifications;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async updateAllUsersIsSeenNotifications(userId: number, isSeen: boolean) {
        try {
            const notifications = await this.notificationsModel.update(
                {
                    isSeen: isSeen
                },
                {
                    where: { userId: userId }
                }
            );
            if (notifications[0] !== 0) {
                return notifications;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async getIsSeenNotificationsCount(userId: number, isSeen: boolean) {
        try {
            const notificationsCount = await this.notificationsModel.count({
                where: {
                    userId: userId
                },
            });
            const unSeenCount = await this.notificationsModel.count({
                where: {
                    userId: userId, isSeen: isSeen
                },
            });
            return { notificationsCount, unSeenCount };
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async getUserNotificationsByUserType(userId: number, userType: string, limit: any, offset: any) {
        try {
            const notifications = await this.notificationsModel.findAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                // raw: true,
                order: [['createdAt', 'DESC']],
                where: {
                    userId,
                    userType
                },
            });
            if (notifications[0]) {
                notifications.forEach(x => {
                    let val = x.data;
                    x.data = JSON.parse(val);
                })
                return response(true, 200, "All user notifications", notifications);
            }
            else {
                return response(true, 200, "No notifications available", {});
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async updateUsersIsSeenNotificationsByIdList(ids: number[], isSeen: boolean) {
        try {
            const notifications = await this.notificationsModel.update(
                {
                    isSeen: isSeen
                },
                {
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                }
            );
            if (notifications[0] !== 0) {
                return notifications;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async updateRideRequestNotification(id: number, obj: any) {
        try {
            delete obj.id;
            const notifications = await this.notificationsModel.update(
                obj,
                {
                    where: {
                        id: id
                    }
                }
            );
            if (notifications[0] !== 0) {
                return notifications;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in updateRideRequestNotification"));
        }
    }

}
