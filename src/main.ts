import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";
import {Logger} from "nestjs-pino";
import {ResponseTransformInterceptor} from "./shared/interceptors/response-transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', { infer: true });
  const appVersion = configService.get<string>('APP_VERSION', { infer: true });
  // const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix(`api/${appVersion}`);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  // app.useGlobalFilters(new MongooseExceptionFilter(), new HttpExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useLogger(app.get(Logger));

  await app.listen(port);
  console.log(`App running on: http://localhost:${port}`);
}
bootstrap();
