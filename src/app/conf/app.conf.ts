import 'dotenv/config';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import { AppConfig } from './types/app-config.type';
import { Transform } from 'class-transformer';
import { validateConfig } from '../shared/utils/validateConfig';
class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;

  @IsString()
  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  API_URL: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsPositive()
  API_PORT: string;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE,
    headerLanguage: process.env.APP_HEADER_LANGUAGE,
    frontendUrl: process.env.FRONTEND_URL,
    apiUrl: process.env.API_URL,
    apiPort: parseInt(process.env.API_PORT, 10),
    dbUrl: process.env.DATABASE_URL,
    databasePoolMax: 500,
  };
});
