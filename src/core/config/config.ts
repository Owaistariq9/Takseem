import * as dotenv from 'dotenv';
dotenv.config();

export const Config = {
    secret: process.env.SECRET_KEY,
    jwt_expire_time: process.env.TOKEN_EXPIRY,
    algorithm: process.env.ALGORITHM,
    db_userName: process.env.DB_USERNAME || "root",
    db_password: process.env.DB_PASSWORD || "root123",
    microservice_host: process.env.LOCAL_HOST,
    microservice_port: process.env.MICROSERVICE_PORT || 3001,
    notification_microservice_host: process.env.NOTIFICATION_MICROSERVICE_HOST,
    notification_microservice_port: Number(process.env.NOTIFICATION_MICROSERVICE_PORT) || 3002,
    dashboard_microservice_host: process.env.DASHBOARD_MICROSERVICE_HOST,
    dashboard_microservice_port: Number(process.env.DASHBOARD_MICROSERVICE_PORT) || 3005
};