import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {HttpAdapterHost} from "@nestjs/core";
import {IResponse} from "../interfaces/IResponse";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost
        // private readonly logger: Logger
    ) {
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception['response']['message']
                : 'Something bad happened';

        // this.logger.error(
        //     `method: ${request.method}, code: ${statusCode}, message: ${message}`,
        // );

        const responseBody = {
            statusCode: statusCode,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            method: request.method,
            message: message
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}