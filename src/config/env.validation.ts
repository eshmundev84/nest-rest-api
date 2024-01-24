import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  APP_NAME: string;

  @IsString()
  APP_VERSION: string;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  UPLOAD_LOCATION: string;

  @IsString()
  PUBLIC_LOCATION: string;

  @IsString()
  MONGODB_URI: string;

  @IsString()
  JWT_SECRET_KEY: string;

  @IsNumber()
  JWT_EXPIRATION: number;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
