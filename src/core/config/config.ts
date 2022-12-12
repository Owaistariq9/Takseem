import * as dotenv from 'dotenv';
dotenv.config();

export const Config = {
    secret: process.env.SECRET_KEY,
    jwt_expire_time: process.env.TOKEN_EXPIRY,
    algorithm: process.env.ALGORITHM,
    db_userName: process.env.DB_USERNAME || "root",
    db_password: process.env.DB_PASSWORD || "root123",
    port: process.env.PORT,
    auth_microservice_host: process.env.AUTH_MICROSERVICE_HOST,
    auth_microservice_port: Number(process.env.AUTH_MICROSERVICE_PORT) || 3001,
    notification_microservice_host: process.env.NOTIFICATION_MICROSERVICE_HOST,
    notification_microservice_port: Number(process.env.NOTIFICATION_MICROSERVICE_PORT) || 3002,
    upload_microservice_host: process.env.UPLOAD_MICROSERVICE_HOST,
    upload_microservice_port: Number(process.env.UPLOAD_MICROSERVICE_PORT) || 3003,
    ride_microservice_host: process.env.RIDE_MICROSERVICE_HOST,
    ride_microservice_port: Number(process.env.RIDE_MICROSERVICE_PORT) || 3004,
    dashboard_microservice_host: process.env.DASHBOARD_MICROSERVICE_HOST,
    dashboard_microservice_port: Number(process.env.DASHBOARD_MICROSERVICE_PORT) || 3005

};