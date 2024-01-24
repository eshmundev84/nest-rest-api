import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import {Request, Response} from 'express';
import * as MongooseError from 'mongoose/lib/error';
import {HttpAdapterHost} from "@nestjs/core";


@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost
        // private readonly logger: Logger
    ) {
    }

    catch(exception: MongooseError, host: ArgumentsHost) {
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();

        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        let message = '';
        const exceptionCode = exception['code'];

        switch (exceptionCode) {
            case 11000:
                const duplicatedKey: string = Object.keys(exception['keyValue'])[0];
                message = `${duplicatedKey} already exists`;
                break;
            default:
                message = 'Database connection error';
        }

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