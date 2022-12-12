import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { catchError, interval, take } from 'rxjs';
import { CompanyCodesService } from 'src/company-codes/company-codes.service';
import { Config } from 'src/core/config/config';
import { determineUserRole, response } from 'src/helpers/helper-functions';
import { OtpCodes } from 'src/models/otp_code.model';
import { Rides } from 'src/models/rides.model';
import { Vehicles } from 'src/models/vehicles.model';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    private notificationService: ClientProxy;
    private rideService: ClientProxy;
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly companyCodesService: CompanyCodesService,
        @InjectModel(OtpCodes) private readonly otpModel: typeof OtpCodes,
        @InjectModel(Vehicles) private readonly vehicles: typeof Vehicles
    ) {
        this.notificationService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.notification_microservice_host,
                port: Config.notification_microservice_port,
            },
        });

        this.rideService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.ride_microservice_host,
                port: Config.ride_microservice_port,
            },
        });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        const encryptedPassword = await this.usersService.encryptPassword(password);
        if (user && user.password === encryptedPassword) {
            const { password, ...rest } = user;
            return rest
        }
        return null
    }

    async getOtpByPhone(phone: string, code: string): Promise<any> {
        const otp = await this.otpModel.findOne({
            where: {
                user_phone: phone,
                code: code
            },
        });
        if (!otp) {
            throw new RpcException(new BadRequestException("Invalid otp code"))
        }
        return otp;
    }

    async validateUserByPhone(phone: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByPhone(phone);
        const encryptedPassword = await this.usersService.encryptPassword(password);
        if (user && user.password === encryptedPassword) {
            const { password, ...rest } = user;
            return rest
        }
        return null
    }

    async signup(user: any): Promise<any> {
        const checkUser = await this.usersService.getUserByEmail(user.email);
        if (checkUser) {
            throw new RpcException(new BadRequestException("User already exists by this email"));
        }
        const phoneUser = await this.usersService.getUserByPhone(user.phone);
        if (phoneUser) {
            throw new RpcException(new BadRequestException("User already exists by this phone"));
        }
        if (!user.otp) {
            const x = await this.notificationService.send<any>("sendOtpCode", user).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            // x.subscribe()
            await x.forEach(x => {

            })
            return response(true, 200, "OTP sent on your mobile number and email", {});
        }
        else {
            try {
                // const code = await this.otpModel.findOne({
                //     where: {
                //         user_phone: user.phone,
                //         code: user.otp
                //     },
                // });
                const code = await this.getOtpByPhone(user.phone, user.otp);
                if (!code) {
                    throw new RpcException(new BadRequestException("Invalid otp code"))
                }
                const encryptedPassword = await this.usersService.encryptPassword(user.password);
                user.password = encryptedPassword;
                const userData = await this.usersService.singup(user);
                // return await this.login(userData, user.token);
                const loginData = await this.login(userData, user.token);
                return response(true, 200, "Signup successful", loginData);
            }
            catch (err) {
                console.log("error", err);
                return err;
            }
        }
    }

    async existingUser(user: any): Promise<any> {
        if (user.email) {
            const emailUser = await this.usersService.getUserByEmail(user.email);
            if (emailUser) {
                throw new RpcException(new BadRequestException("User already exists by this email"));
            }
        }
        if (user.phone) {
            const phoneUser = await this.usersService.getUserByPhone(user.phone);
            if (phoneUser) {
                throw new RpcException(new BadRequestException("User already exists by this phone"));
            }
        }
        return response(true, 200, "This email or phone do not exist.", {})

    }

    async login(user: any, token: string) {
        const payload = {
            userId: user.id,
            token
        }

        const x = this.notificationService.send<any>("addFcmToken", payload).pipe(catchError(val => {
            throw new HttpException(val.response, val.status);
        }))
        x.subscribe();

        const userObj = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date().getTime(),
            expiryTime: Config.jwt_expire_time,
            role_id: user.role_id,
        };
        let company_code = 9999;
        if (user.company_id) {
            const companyCode = await this.companyCodesService.getCodeByCompanyId(user.company_id);
            company_code = companyCode.code;
        }
        // const y = this.rideService.send<any>("getUserVehicleCount", user.id).pipe(catchError(val => {
        //     throw new HttpException(val.response, val.status);
        // }))
        // let data;
        // await y.forEach(val => {
        //     data = val;
        // })

        const vehicleCount = await this.vehicles.count(
            {
                where: { user_id: user.id }
            }
        )

        const rideIds = [];
        const allRides: any = await this.vehicles.findAll({
            include: [{
                model: Rides
            }],
            where: { user_id: user.id }
        })
        if (allRides[0]) {
            allRides.forEach(x => {
                rideIds.push(x.dataValues.ride.id);
            })
        }

        return {
            token: this.jwtService.sign(userObj),
            id: user.id,
            company_code,
            name: user.name,
            gender: user.gender,
            role: determineUserRole(user.role_id),
            company_id: user.company_id,
            company_location_id: user.company_location_id,
            rides: vehicleCount,
            rideIds: rideIds
        }
    }

    async updatePasswordFromPhone(password: string, phone: string, code: string): Promise<any> {
        await this.getOtpByPhone(phone, code);
        const encryptedPassword = await this.usersService.encryptPassword(password);
        const user = await this.usersService.updateUserPasswordByPhone(phone, encryptedPassword);
        if (user[0] === 0) {
            throw new RpcException(new BadRequestException("Invalid phone or code"));
        }
        return user;
    }

}
