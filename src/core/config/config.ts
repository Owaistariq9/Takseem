import * as dotenv from 'dotenv';
dotenv.config();

export const Config = {
    secret: process.env.SECRET_KEY,
    jwt_expire_time: process.env.TOKEN_EXPIRY,
    algorithm: process.env.ALGORITHM,
    db_userName: process.env.DB_USERNAME || "root",
    db_password: process.env.DB_PASSWORD || "owais123",
    microservice_host: process.env.LOCAL_HOST,
    microservice_port: process.env.MICROSERVICE_PORT || 3005,
    vehicle_microservice_host: process.env.VEHICLE_MICROSERVICE_HOST,
    vehicle_microservice_port: Number(process.env.VEHICLE_MICROSERVICE_PORT) || 3002
};