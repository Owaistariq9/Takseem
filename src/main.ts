import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http-exception.filter';
import { ExceptionFilter } from './rpc-exception.filter';

async function Localbootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted:true,
    skipMissingProperties: true
  }))
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new ExceptionFilter());
  app.setGlobalPrefix('takseem/api/v1');
  const options = new DocumentBuilder()
  .setTitle("Takseem Apis")
  .setDescription("The objective of this project is to develop efficient car polling mobile application on android and iOS technology a platform where any employees of a company can socialize as well as share rides.")
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    description: 'Enter JWT token'
  })
  .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.listen(process.env.PORT || 3000);
}


const version = process.version  
console.log(version)

Localbootstrap();
