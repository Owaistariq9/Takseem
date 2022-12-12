import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as admin from 'firebase-admin';
import { NotificationsService } from 'src/notifications/notifications.service';
import { FcmDataService } from './fcm.data.service';

@Injectable()
export class FcmService {
    constructor(
        private readonly fcmDataService: FcmDataService,
        private readonly notificationsService: NotificationsService
    ) { }

    async sendNotification(body: any) {
        const fcmToken = await this.fcmDataService.getTokenByUserId(body.userId);
        const payload = {
            notification: {
                title: body.title,
                body: body.body
            },
            token: fcmToken.token,
            data: {
                type: "home"
            }
        };
        admin.messaging().send(payload)
            .then((response) => {
                console.log('Successfully sent message: ', response);
                this.notificationsService.insertNotification(body.userId, body.title, body.body, body.userType, payload.data);
                return 'Successfully sent message: ' + response.toString();
            })
            .catch((error) => {
                console.log('Error sending message: ', error);
                throw new RpcException(new HttpException("Something went wrong sending notification", 500));
            });
    }

    async sendNotificationsToMultipleDevices(body: any) {
        const fcmTokens = await this.fcmDataService.getTokensByUserId(body.userId);
        let tokens = [];
        fcmTokens.forEach(x => {
            tokens.push(x.token);
        })
        const payload = {
            notification: {
                title: body.title,
                body: body.body
            },
            tokens: tokens,
            data: body.data,
        };
        admin.messaging().sendMulticast(payload)
            .then((response) => {
                this.notificationsService.insertNotification(body.userId, body.title, body.body, body.userType, payload.data);
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(tokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                }
                return 'Successfully sent message: ' + response.toString();
            });
    }

    async sendNotificationsToMultipleUsers(body: any) {
        let tokens = [];
        for (let i = 0; i < body.userIds.length; i++) {
            const fcmTokens = await this.fcmDataService.getTokensByUserId(body.userIds[i]);
            fcmTokens.forEach(x => {
                tokens.push(x.token);
            })
        }
        const payload = {
            notification: {
                title: body.title,
                body: body.body
            },
            tokens: tokens,
            data: body.data
        };
        admin.messaging().sendMulticast(payload)
            .then((response) => {
                this.notificationsService.insertManyNotification(body.userIds, body.title, body.body, body.userType, payload.data);
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(tokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                }
                return 'Successfully sent message: ' + response.toString();
            });
    }

    async insertDeviceToken(userId: string, token: string) {
        return await this.fcmDataService.insertFcmToken(userId, token);
    }

    async deleteToken(token: string) {
        return await this.fcmDataService.deleteToken(token);
    }
}
