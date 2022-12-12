import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Config } from './core/config/config';
// import { AllExceptionsFilter } from './http-exception.filter';
import { ExceptionFilter } from './rpc-exception.filter';
import * as admin from 'firebase-admin'
import { ServiceAccount } from "firebase-admin";

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: Config.microservice_host,
    port: Config.microservice_port,
  },
};

const adminConfig: ServiceAccount = {
  "projectId": Config.fcm_projectId,
  "privateKey": Config.fcm_privateKey,
  "clientEmail": Config.fcm_clientEmail
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  app.useGlobalFilters(new ExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter());


  admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
  })

  app.listen();
}

bootstrap();
