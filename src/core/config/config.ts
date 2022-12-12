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
    aws_access_key:  process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key:  process.env.AWS_SECRET_ACCESS_KEY,
    aws_region:  process.env.AWS_DEFAULT_REGION,
    aws_bucket:  process.env.AWS_BUCKET,
    s3_bucket_url: process.env.S3_BASE_URL
};