import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
    secret: process.env.SECRET_KEY,
    jwt_expire_time: process.env.TOKEN_EXPIRY,
    algorithm: process.env.ALGORITHM,
    db_userName: process.env.DB_USERNAME || "root",
    db_password: process.env.DB_PASSWORD || "owais123",
    microservice_host: process.env.LOCAL_HOST,
    microservice_port: process.env.MICROSERVICE_PORT,
    smtp_host: process.env.SMTP_SERVICE,
    smtp_email: process.env.SMTP_EMAIL,
    smtp_password: process.env.SMTP_PASS,
    smtp_name: process.env.SMTP_NAME,
    fcm_projectId: process.env.FCM_PROJECT_ID,
    fcm_privateKey: process.env.FCM_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    fcm_clientEmail: process.env.FCM_CLIENT_EMAIL
};