import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import * as admin from 'firebase-admin';
import { response } from 'src/helpers/helper-functions';
import { FcmTokens } from './fcm-token.model';

@Injectable()
export class FcmDataService {
    constructor(
        @InjectModel(FcmTokens) private readonly fcmModel: typeof FcmTokens
    ) { }

    async insertFcmToken(userId: string, token: string) {
        const obj: any = await this.fcmModel.create({ userId, token });
        return obj.dataValues;
    }

    async getTokenByUserId(userId: string) {
        try {
            const token: any = await this.fcmModel.findOne({
                raw: true,
                where: {
                    userId
                },
            });
            return token;
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

    async getTokensByUserId(userId: string) {
        try {
            const token: any = await this.fcmModel.findAll({
                raw: true,
                where: {
                    userId
                },
            });
            if (token[0]) {
                return token;
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

    async deleteToken(token: string) {
        try {
            const fcmToken = await this.fcmModel.destroy({
                where: {
                    token: token
                },
            });
            if (fcmToken === 0) {
                throw new RpcException(new BadRequestException("Invalid token"))
            }
            return response(true, 200, "Successfully logged out", {});
        }
        catch (err) {
            console.log(err);
            throw new RpcException(new InternalServerErrorException("Something went wrong in getTokensByUserId"));
        }
    }

}
