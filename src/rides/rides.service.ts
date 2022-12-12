import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { Config } from '../core/config/config';
import { Ride_days } from '../models/ride_days.model';
import { Ride_preferences } from '../models/ride_preferences.model';
import { Rides } from '../models/rides.model';
import { Veh_documents } from '../models/veh_documents.model';
import { Vehicles } from '../models/vehicles.model';
import { UserLastLocations } from '../models/users_last_locations.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { RideRequests } from 'src/models/ride_requests.model';
import sequelize, { Op } from 'sequelize';
import { catchError } from 'rxjs';
import { Constants, RideRequestStatus } from 'src/core/constants/constants';
import { CancelRideRequests } from 'src/models/cancel_ride_requests.model';
import { response } from 'src/helpers/helper-functions';
import { User } from 'src/models/user.model';




@Injectable()
export class RidesService {
    private notificationService: ClientProxy
    private dashboardService: ClientProxy
    constructor(
        @InjectModel(Ride_preferences) private readonly ride_preferences: typeof Ride_preferences,
        @InjectModel(Rides) private readonly rides: typeof Rides,
        @InjectModel(Veh_documents) private readonly veh_documents: typeof Veh_documents,
        @InjectModel(Vehicles) private readonly vehicles: typeof Vehicles,
        @InjectModel(Ride_days) private readonly ride_days: typeof Ride_days,
        @InjectModel(RideRequests) private readonly rideRequests: typeof RideRequests,
        @InjectModel(CancelRideRequests) private readonly cancelRideRequests: typeof CancelRideRequests,
        @InjectModel(UserLastLocations) private readonly userLastLocations: typeof UserLastLocations,
        private sequelize: Sequelize,

    ) {
        this.notificationService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.notification_microservice_host,
                port: Config.notification_microservice_port,
            },
        });
        this.dashboardService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: Config.dashboard_microservice_host,
                port: Config.dashboard_microservice_port,
            },
        });
    }


    async create(body: any): Promise<any> {
        const t = await this.sequelize.transaction();
        try {
            let { vehicle, documents, ride, preferences, days, userId } = body;
            vehicle["user_id"] = userId; //Need to fetch it from Token

            let insertVehicle = await this.vehicles.create(vehicle, { transaction: t })

            if (!insertVehicle) throw new RpcException(new InternalServerErrorException("Unable to create ride, Contact Support"));

            let newObj = documents.map(cp => ({ ...cp, vehicle_id: insertVehicle.id }))

            let insertDocs = await this.veh_documents.bulkCreate(newObj, { transaction: t })

            ride["vehicle_id"] = insertVehicle.id;
            let insertRide = await this.rides.create(ride, { transaction: t })

            if (!insertRide) throw new RpcException(new InternalServerErrorException("Unable to create ride, Contact Support"));

            preferences["ride_id"] = insertRide.id;
            let insertPreferences = await this.ride_preferences.create(preferences, { transaction: t })

            days["ride_id"] = insertRide.id;
            let insertDays = await this.ride_days.create(days, { transaction: t })
            await t.commit();
            return { message: "Success Ride Created" }

        } catch (error) {
            await t.rollback();
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to create ride, Contact Support", 500));
        }

    }

    async getUserRides(user_id: number): Promise<any> {
        try {
            const rides: any = await this.vehicles.findOne({
                include: [{
                    model: Rides
                }],
                where: { user_id: user_id }
            })
            return response(true, 200, "My rides", rides);

        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to create ride, Contact Support", 500));
        }

    }

    async getUserVehicleCount(user_id: number): Promise<any> {
        try {
            const vehicleCount = await this.vehicles.count(
                {
                    where: { user_id: user_id }
                }
            )
            return vehicleCount;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Something went wrong in getUserVehicleCount", 500));
        }
    }

    async searchRides(body: any): Promise<any> {
        const { userId, ride_type, userLatitude, userLongitude, music, smoking, ac, gender_preference, start_time, return_time, page, limit } = body;

        const bookedRideIds = [];
        const bookedRides = await this.checkAllBookedRides(userId);
        if (bookedRides[0]) {
            bookedRides.forEach(x => {
                bookedRideIds.push(x.ride_id);
            })
        }

        const startIndex = (parseInt(page) - 1) * limit;

        const endIndex = startIndex + limit;

        let whereQuery = `WHERE `;
        if (ride_type === "round") {
            whereQuery += `r.ride_type = '${ride_type}' AND `
        }
        if (music === 'off' || music === 'on') {
            whereQuery += `rp.music = '${music}' AND `
        }
        if (smoking === 'off' || smoking === 'on') {
            whereQuery += `rp.smoking = '${smoking}' AND `
        }
        if (ac === 'off' || ac === 'on') {
            whereQuery += `rp.ac = '${ac}' AND `
        }
        if (gender_preference) {
            whereQuery += `rp.gender_preference = '${gender_preference}' AND `
        }
        if (start_time) {
            whereQuery += `(r.start_time BETWEEN ${start_time - 120} AND ${start_time + 120}) AND `
        }
        if (return_time) {
            whereQuery += `(r.return_time BETWEEN ${return_time - 120} AND ${return_time + 120}) AND `
        }
        if (bookedRideIds[0]) {
            whereQuery += `r.id NOT IN (${bookedRideIds}) AND `
        }
        whereQuery += `v.user_id != ${userId} AND `
        whereQuery += `rp.seats_available > 0 `

        //     const rides = this.rideRequests.sequelize.query(`SELECT 
        //     r.id,
        //     r.latitude,
        //     r.longitude,
        //     rp.ride_id,
        //     rp.music,
        //     rp.smoking,
        //     rp.ac,
        //     rp.gender_preference,
        //     rp.seats_available,
        //     (
        //         6371 *
        //         acos(cos(radians(${userLatitude})) * 
        //         cos(radians(r.latitude)) * 
        //         cos(radians(r.longitude) - 
        //         radians(${userLongitude})) + 
        //         sin(radians(${userLatitude})) * 
        //         sin(radians(r.latitude)))
        //     ) AS distance 
        //     FROM rides AS r
        //     INNER JOIN ride_preferences AS rp ON rp.ride_id=r.id
        //     ${whereQuery}
        //     HAVING distance < 5 
        //     ORDER BY distance LIMIT 0, 20;`)
        // }

        const rides: any = await this.rideRequests.sequelize.query(`SELECT 
        COUNT(r.id) as count,
        r.id,
        r.latitude,
        r.longitude,
        r.start_time,
        r.return_time,
        r.ride_type,
        r.vehicle_id,
        r.address,
        r.pick_in_km,
        v.user_id,
        v.model_id,
        v.fuel_type,
        v.color,
        v.engine,
        u.name as riderName,
        u.picture,
        model.name as modelName,
        model.make_id,
        mak.id,
        mak.name as makeName,
        mak.type_id,
        vt.id,
        vt.max_seats,
        rd.monday,
        rd.tuesday,
        rd.wednesday,
        rd.thursday,
        rd.friday,
        rd.saturday,
        rd.sunday,
        rp.ride_id,
        rp.music,
        rp.smoking,
        rp.ac,
        rp.gender_preference,
        rp.seats_available,
        ( 
        6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) )))  AS distance 
        FROM db_takseem.rides AS r
        INNER JOIN db_takseem.ride_preferences AS rp ON rp.ride_id=r.id
        INNER JOIN db_takseem.ride_days AS rd ON rd.ride_id=r.id
        INNER JOIN db_takseem.vehicles AS v ON v.id=r.vehicle_id
        INNER JOIN db_takseem.users AS u ON u.id=v.user_id
        INNER JOIN db_takseem.veh_models AS model ON model.id=v.model_id
        INNER JOIN db_takseem.veh_makes AS mak ON mak.id=model.make_id
        INNER JOIN db_takseem.veh_types AS vt ON vt.id=mak.type_id
        ${whereQuery}
        HAVING distance < 10
        ORDER BY distance LIMIT ${startIndex}, ${endIndex};`)

        const ridesCount = await this.rideRequests.sequelize.query(`SELECT 
        COUNT(r.id) as count,
        r.id,
        r.latitude,
        r.longitude,
        r.start_time,
        r.return_time,
        r.ride_type,
        r.vehicle_id,
        r.address,
        r.pick_in_km,
        v.user_id,
        v.model_id,
        v.fuel_type,
        v.color,
        v.engine,
        u.name as riderName,
        u.picture,
        model.name as modelName,
        model.make_id,
        mak.id,
        mak.name as makeName,
        mak.type_id,
        vt.id,
        vt.max_seats,
        rd.monday,
        rd.tuesday,
        rd.wednesday,
        rd.thursday,
        rd.friday,
        rd.saturday,
        rd.sunday,
        rp.ride_id,
        rp.music,
        rp.smoking,
        rp.ac,
        rp.gender_preference,
        rp.seats_available,
        ( 
        6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) )))  AS distance 
        FROM db_takseem.rides AS r
        INNER JOIN db_takseem.ride_preferences AS rp ON rp.ride_id=r.id
        INNER JOIN db_takseem.ride_days AS rd ON rd.ride_id=r.id
        INNER JOIN db_takseem.vehicles AS v ON v.id=r.vehicle_id
        INNER JOIN db_takseem.users AS u ON u.id=v.user_id
        INNER JOIN db_takseem.veh_models AS model ON model.id=v.model_id
        INNER JOIN db_takseem.veh_makes AS mak ON mak.id=model.make_id
        INNER JOIN db_takseem.veh_types AS vt ON vt.id=mak.type_id
        ${whereQuery}
        HAVING distance < 10
        ORDER BY distance`)

        if (rides[0][0]) {
            rides[0][0].count = ridesCount[0].length;
        }

        return response(true, 200, "Filtered rides", rides[0]);
    }

    async createRideRequest(body: any): Promise<any> {
        const t = await this.sequelize.transaction();
        try {
            const requestObj = {
                ride_id: body.ride_id,
                passenger_id: body.passenger_id,
                latitude: body.pickup.latitude,
                longitude: body.pickup.longitude
            };
            const rideRequest = await this.rideRequests.create(requestObj, { transaction: t });
            // const ridePreference = await this.ride_preferences.increment('seats_available',
            //     {
            //         by: -1,
            //         where: { ride_id: body.ride_id, seats_available: { [Op.gt]: 0 } },
            //         transaction: t
            //     })
            let address = this.dashboardService.send<any>("getCompanyAddressById", body.company_location_id).pipe(catchError(val => {
                throw new HttpException(val.response, val.status);
            }))
            let data;
            await address.forEach(val => {
                data = val;
            })
            let company_address = {
                name: data.name,
                address: data.formatted_address,
                latitude: data.latitude,
                longitude: data.longitude
            }
            const notification = {
                userId: body.driverUserId,
                title: "Ride Request",
                userType: Constants.rider,
                body: body.userName + " has requested a ride with you.",
                data: {
                    passanger_address: JSON.stringify(body.pickup),
                    company_address: JSON.stringify(company_address),
                    passenger_id: body.passenger_id.toString(),
                    ride_id: body.ride_id.toString(),
                    request_id: rideRequest.id.toString(),
                    type: "ride_request"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            await t.commit();
            return response(true, 201, "Ride Request submitted", rideRequest);
        } catch (error) {
            await t.rollback();
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to create ride request, Contact Support", 500));
        }
    }

    async acceptRideRequest(params: any): Promise<any> {
        const t = await this.sequelize.transaction();
        try {
            const checkSeats = await this.ride_preferences.findOne({
                where: { ride_id: params.ride_id }
            })
            if (checkSeats.seats_available <= 0) {
                throw new RpcException(new BadRequestException("No more seats available."))
            }
            const rideRequest = await this.rideRequests.update(
                {
                    status: RideRequestStatus[1]
                },
                {
                    where: { id: params.id },
                    transaction: t
                }
            );
            const ridePreference = await this.ride_preferences.increment('seats_available',
                {
                    by: -1,
                    where: { ride_id: params.ride_id, seats_available: { [Op.gt]: 0 } },
                    transaction: t
                })
            const notification = {
                userId: params.passenger_id,
                title: "Congratulations!",
                userType: Constants.passenger,
                body: "Your ride request has been accepted.",
                data: {
                    type: "accept"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            await t.commit();
            return response(true, 200, "Ride request accepted", {});
        } catch (error) {
            await t.rollback();
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to accept ride request, Contact Support", error.error.status || 500));
        }
    }

    async rejectRideRequest(params: any): Promise<any> {
        const t = await this.sequelize.transaction();
        try {
            const rideRequest: any = await this.rideRequests.update(
                {
                    status: RideRequestStatus[2]
                },
                {
                    where: { id: params.id },
                    transaction: t
                }
            )
            // const ridePreference = await this.ride_preferences.increment('seats_available',
            //     {
            //         by: 1,
            //         where: { ride_id: params.ride_id },
            //         transaction: t
            //     })
            const notification = {
                userId: params.passenger_id,
                title: "Sorry!",
                body: "Your ride request has been rejected.",
                userType: Constants.passenger,
                data: {
                    type: "reject"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            await t.commit();
            return response(true, 200, "Ride request rejected", {});
        } catch (error) {
            await t.rollback();
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to reject ride request, Contact Support", 500));
        }
    }

    async getAllBookedRides(userId: number): Promise<any> {
        try {
            // const rides: any = await this.rideRequests.findAll({
            //     // raw: true,
            //     include: [{
            //         model: Rides
            //     }],
            //     where: { passenger_id: userId, status: RideRequestStatus[1] }
            // })


            const rides = await this.rides.sequelize.query(`SELECT 
            r.id,
            r.latitude,
            r.longitude,
            r.start_time,
            r.return_time,
            r.ride_type,
            r.vehicle_id,
            r.address,
            r.pick_in_km,
            v.user_id,
            v.model_id,
            v.fuel_type,
            v.color,
            v.engine,
            u.name as riderName,
            u.picture,
            model.name as modelName,
            model.make_id,
            mak.id,
            mak.name as makeName,
            mak.type_id,
            vt.id,
            vt.max_seats,
            rd.monday,
            rd.tuesday,
            rd.wednesday,
            rd.thursday,
            rd.friday,
            rd.saturday,
            rd.sunday,
            rr.id as requestId,
            rr.status,
            rr.passenger_id,
            rp.ride_id,
            rp.music,
            rp.smoking,
            rp.ac,
            rp.gender_preference,
            rp.seats_available
            FROM db_takseem.rides AS r
            INNER JOIN db_takseem.ride_requests AS rr ON rr.ride_id=r.id
            INNER JOIN db_takseem.ride_preferences AS rp ON rp.ride_id=r.id
            INNER JOIN db_takseem.ride_days AS rd ON rd.ride_id=r.id
            INNER JOIN db_takseem.vehicles AS v ON v.id=r.vehicle_id
            INNER JOIN db_takseem.users AS u ON u.id=v.user_id
            INNER JOIN db_takseem.veh_models AS model ON model.id=v.model_id
            INNER JOIN db_takseem.veh_makes AS mak ON mak.id=model.make_id
            INNER JOIN db_takseem.veh_types AS vt ON vt.id=mak.type_id
            WHERE (rr.status = '${RideRequestStatus[1]}' OR rr.status = '${RideRequestStatus[4]}' OR rr.status = '${RideRequestStatus[5]}' OR rr.status = '${RideRequestStatus[6]}' OR rr.status = '${RideRequestStatus[7]}') AND rr.passenger_id = ${userId};`)
            return response(true, 200, "All booked rides", rides[0]);
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to get booked ride request, Contact Support", 500));
        }
    }

    async getAllPendingRides(userId: number): Promise<any> {
        try {
            const rides: any = await this.rideRequests.findAll({
                raw: true,
                include: [{
                    model: Rides
                }],
                where: { passenger_id: userId, status: RideRequestStatus[0] }
            })
            return response(true, 200, "All pending rides", rides);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to get pending ride request, Contact Support", 500));
        }
    }

    async getAllRejectedRides(userId: number): Promise<any> {
        try {
            const rides: any = await this.rideRequests.findAll({
                raw: true,
                include: [{
                    model: Rides
                }],
                where: { passenger_id: userId, status: RideRequestStatus[2] }
            })
            return response(true, 200, "All rejected rides", rides);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to get rejected ride request, Contact Support", 500));
        }
    }

    async getAllCancelledRides(userId: number): Promise<any> {
        try {
            const rides: any = await this.rideRequests.findAll({
                raw: true,
                include: [{
                    model: Rides
                }],
                where: { passenger_id: userId, status: RideRequestStatus[3] }
            })
            return response(true, 200, "All cancelled rides", rides);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to get cancelled ride request, Contact Support", 500));
        }
    }

    async checkAllBookedRides(userId: number): Promise<any> {
        try {
            const rides: any = await this.rideRequests.findAll({
                raw: true,
                where: {
                    passenger_id: userId,
                    status: {
                        [Op.in]: [RideRequestStatus[1], RideRequestStatus[4], RideRequestStatus[5], RideRequestStatus[6]]
                    }
                }
            })
            return rides;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to get cancelled ride request, Contact Support", 500));
        }
    }

    async cancelledRideRequest(body: any): Promise<any> {
        const t = await this.sequelize.transaction();
        try {
            const rideRequest: any = await this.rideRequests.update(
                {
                    status: RideRequestStatus[3]
                },
                {
                    where: { id: body.id },
                    transaction: t
                }
            )
            const ridePreference = await this.ride_preferences.increment('seats_available',
                {
                    by: 1,
                    where: { ride_id: body.ride_id },
                    transaction: t
                })
            const cancelObj = {
                ride_request_id: body.id,
                message: body.message
            }
            await this.cancelRideRequests.create(cancelObj, { transaction: t });
            await t.commit();
            const notification = {
                userId: body.rider_id,
                title: "Ride Cancelled",
                userType: Constants.rider,
                body: body.userName + " has left your ride.",
                data: {
                    passenger_id: body.passenger_id.toString(),
                    type: "cancel"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            return response(true, 200, "Your ride has been cancelled.", {});;
        } catch (error) {
            await t.rollback();
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to cancel ride request, Contact Support", 500));
        }
    }

    async notComingRideRequest(body: any): Promise<any> {
        try {
            const rideRequest: any = await this.rideRequests.update(
                {
                    status: RideRequestStatus[4]
                },
                {
                    where: { id: body.id },
                }
            )
            const notification = {
                userId: body.rider_id,
                title: "Passenger Is Not Coming",
                userType: Constants.rider,
                body: body.passangerName + " is not coming today!",
                data: {
                    passenger_id: body.passenger_id.toString(),
                    passangerName: body.passangerName,
                    type: "not_coming"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            return response(true, 200, "Ride status has been updated", {});;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to cancel ride request, Contact Support", 500));
        }
    }

    async pickedRideRequest(body: any): Promise<any> {
        try {
            const rideRequest: any = await this.rideRequests.update(
                {
                    status: RideRequestStatus[7]
                },
                {
                    where: { id: body.id },
                }
            )
            const notification = {
                userId: body.rider_id,
                title: "Passanger Picked",
                userType: Constants.rider,
                body: body.passangerName + " has been picked!",
                data: {
                    passenger_id: body.passenger_id.toString(),
                    passangerName: body.passangerName,
                    type: "picked"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationToAllDevices", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            return response(true, 200, "Ride status has been updated", {});;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Unable to cancel ride request, Contact Support", 500));
        }
    }

    async getStartRideData(body: any): Promise<any> {
        try {
            const rides: any = await this.rides.sequelize.query(`SELECT 
                r.id,
                r.latitude as startLat,
                r.longitude as startLong,
                v.user_id as rider_id,
                v.id as vehicle_id,
                u.name as riderName,
                p.id as passengerId,
                p.name as passengerName,
                rr.id as requestId,
                rr.status,
                rr.passenger_id,
                rr.latitude as passenger_lat,
                rr.longitude as passenger_long,
                ca.latitude as endLat,
                ca.longitude as endLong
                FROM db_takseem.rides AS r
                INNER JOIN db_takseem.ride_requests AS rr ON rr.ride_id=r.id
                INNER JOIN db_takseem.vehicles AS v ON v.id=r.vehicle_id
                INNER JOIN db_takseem.users AS u ON u.id=v.user_id
                INNER JOIN db_takseem.users AS p ON p.id=rr.passenger_id
                INNER JOIN db_takseem.company_addresses AS ca ON ca.id=u.company_location_id
                WHERE (rr.status = '${RideRequestStatus[1]}' OR rr.status = '${RideRequestStatus[4]}' OR rr.status = '${RideRequestStatus[5]}' OR rr.status = '${RideRequestStatus[6]}' OR rr.status = '${RideRequestStatus[7]}') AND r.id = ${body.ride_id};`);
            if (!rides[0][0]) {
                throw new RpcException(new BadRequestException("There are no passangers in this ride"))
            }
            if (rides[0][0].rider_id === body.user_id) {
                let passangerIds = [];
                rides[0].forEach(val => {
                    val.status = RideRequestStatus[5];
                    passangerIds.push(val.passengerId);
                })
                const updatedRideRequests = await this.rideRequests.update(
                    {
                        status: RideRequestStatus[5]
                    },
                    {
                        where: {
                            passenger_id: {
                                [Op.in]: passangerIds
                            },
                            status: RideRequestStatus[1]
                        },
                    }
                )
                const notification = {
                    userIds: passangerIds,
                    title: "Ride Started",
                    body: `Your ride has been started, ${rides[0][0].riderName} is on his way to pick you.`,
                    userType: Constants.passenger,
                    data: {
                        ride_id: body.ride_id.toString(),
                        type: "ride_started"
                    }
                }
                let x = this.notificationService.send<any>("sendNotificationsToMultipleUsers", notification).pipe(catchError(val => {
                    throw new RpcException(new HttpException(val.response, val.status));
                }))
                x.subscribe();


            }

            //Temporary Fix

            let passengerCount = 0;
            let vehicleId = 0;
            for (let i = 0; i < rides[0].length; i++) {
                const element = rides[0][i];
                if (element.status == RideRequestStatus[1] || element.status == RideRequestStatus[4] || element.status == RideRequestStatus[5]) passengerCount++;
                vehicleId = element.vehicle_id;
            }

            let driverData = { passengerCount };
            let driverLocation = await this.vehicles.findOne({ where: { id: vehicleId }, include: [{ model: User, include: [this.userLastLocations] }] })
            if (driverLocation.user.lastLocation) {
                driverData["driver_lat"] = driverLocation.user.lastLocation?.latitude
                driverData["driver_lon"] = driverLocation.user.lastLocation?.longitude
            }

            let returnData = { rideData: rides[0], driverData }

            return response(true, 200, "getStartRideData", returnData);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Error in getStartRideData, Contact Support", error.error.status || 500));
        }
    }

    async endRide(body: any): Promise<any> {
        try {
            const updatedRideRequests = await this.rideRequests.update(
                {
                    status: RideRequestStatus[1]
                },
                {
                    where: {
                        ride_id: body.ride_id,
                        passenger_id: {
                            [Op.in]: body.passangerIds
                        },
                        // status: RideRequestStatus[5]
                        status: {
                            [Op.in]: [RideRequestStatus[5], RideRequestStatus[7]]
                        }
                    },
                }
            )
            const notification = {
                userIds: body.passangerIds,
                title: "Ride Ended",
                body: "Your ride has been successfully completed!",
                userType: Constants.passenger,
                data: {
                    ride_id: body.ride_id.toString(),
                    type: "ride_ended"
                }
            }
            let x = this.notificationService.send<any>("sendNotificationsToMultipleUsers", notification).pipe(catchError(val => {
                throw new RpcException(new HttpException(val.response, val.status));
            }))
            x.subscribe();
            return response(true, 200, "Ride Ended.", {});;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Error in getStartRideData, Contact Support", 500));
        }
    }

    async getPassengersByRideId(body: any): Promise<any> {
        try {
            const passengers = await this.rideRequests.findAll(
                {
                    include: [{
                        model: User
                    }],
                    where: {
                        ride_id: body.ride_id,
                        status: {
                            [Op.in]: [RideRequestStatus[1], RideRequestStatus[4], RideRequestStatus[5], RideRequestStatus[6]]
                        }
                    }
                }
            )
            return response(true, 200, "Get All Passengers", passengers);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Error in getPassengersByRideId, Contact Support", 500));
        }
    }

    async updateUserLastLocation(body: any): Promise<any> {
        try {
            await this.userLastLocations.create({ user_id: body.user_id, latitude: body.latitude, longitude: body.longitude })
            return response(true, 200, "Driver Location Updated", null);;
        } catch (error) {
            console.log(error)
            throw new RpcException(new HttpException(error.message || "Failed to process your request, Contact Support", 500));
        }
    }


}
