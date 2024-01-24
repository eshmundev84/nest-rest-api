import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {IResponse} from "../interfaces/IResponse";
import {map, Observable} from "rxjs";

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    private readonly logger = new Logger(ResponseTransformInterceptor.name);

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<IResponse<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        this.logger.log(
            `method: ${request.method}, code: ${response.statusCode}, path: ${request.url}`,
        );

        return next.handle().pipe(
            map((data) => ({
                statusCode: response.statusCode,
                method: request.method,
                path: request.url,
                data: data,
            })),
        );
    }
}