// import {
//     ExceptionFilter,
//     Catch,
//     ArgumentsHost,
//     HttpException,
//     HttpStatus,
//     InternalServerErrorException,
//   } from '@nestjs/common';
// import { BaseRpcExceptionFilter } from '@nestjs/microservices';

//   import { Request, Response } from 'express';
  
//   @Catch()
//   // export class AllExceptionsFilter implements ExceptionFilter {
//   export class AllExceptionsFilter extends BaseRpcExceptionFilter implements ExceptionFilter {
//     catch(exception: any, host: ArgumentsHost) {
//       console.log("exception",exception);
//       const ctx = host.switchToRpc();
//       const data = ctx.getData();
//       const context = ctx.getContext();
//       // const response = ctx.getResponse<Response>();
//       // const request = ctx.getRequest<Request>();
//       // const status =
//       //   exception instanceof HttpException
//       //     ? exception.getStatus()
//       //     : HttpStatus.INTERNAL_SERVER_ERROR;
//       // console.log(status);
//       // response.status(status).json({
//       //   statusCode: status,
//       //   message: exception.message || "Internal Server Error",
//       //   timestamp: new Date().toISOString(),
//       //   path: request.url,
//       // });
//       return super.catch(exception, host);
//       // console.log(error);
//     }

//     // catch(exception: any, host: ArgumentsHost) {
//     //   console.log('usereset excption', exception);
//       // let error = {
//       //   message: exception.message,
//       //   code : exception.code
//       // }
//       // const ctx = host.switchToHttp();
//       // const response = ctx.getResponse<Response>();
//       // const request = ctx.getRequest<Request>();
//       // const status =
//       //   exception instanceof HttpException
//       //     ? exception.getStatus()
//       //     : HttpStatus.INTERNAL_SERVER_ERROR;
  
//       // if(!response.status){
//       //   return new InternalServerErrorException();
//       // }
//       // response.status(status).json({
//       //   statusCode: status,
//       //   message: exception.message || "Internal Server Error",
//       //   timestamp: new Date().toISOString(),
//       //   path: request.url,
//       // });
//     // }
//   }

// // import { Catch, ArgumentsHost } from '@nestjs/common';
// // import { BaseRpcExceptionFilter } from '@nestjs/microservices';

// // @Catch()
// // export class AllExceptionsFilter extends BaseRpcExceptionFilter {
//   // catch(exception: any, host: ArgumentsHost) {
//   //   // console.log("exception",host);
//   //   return super.catch(exception, host);
//   // }
// // }