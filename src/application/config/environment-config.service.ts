import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/core/config/database.interface';
import { JWTConfig } from 'src/core/config/jwt.interface';
import { DefaultSuperAdminConfig } from 'src/core/config/superadmin.interface';

/**
 *
 * can make your service more flexible by using the ConfigService to read environment variables.
 *
 *
 */

@Injectable()
export class EnvironmentConfigService
  implements JWTConfig, DefaultSuperAdminConfig, DatabaseConfig
{
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDefaultAdminName(): string {
    return this.configService.get<string>('ADMIN_NAME');
  }

  getDefaultAdminLastName(): string {
    return this.configService.get<string>('ADMIN_LAST_NAME');
  }

  getDefaultAdminEmail(): string {
    return this.configService.get<string>('ADMIN_EMAIL');
  }

  getDefaultAdminPassword(): string {
    return this.configService.get<string>('ADMIN_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  /**
   *
   * note that the getDatabaseMainUrl and getDatabaseDevUrl methods are used as a serverless database provider connection string.
   * you can replace them with your own database connection string or use traditional database port, username, password....etc approach.
   *
   */

  getDatabaseMainUrl(): string {
    return this.configService.get<string>('DB_URL_MAIN');
  }

  getDatabaseDevUrl(): string {
    return this.configService.get<string>('DB_URL_DEV');
  }
}
