import { CanActivate, Injectable } from '@nestjs/common';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import AppUnauthorizedException from '../exception/app-unauthorized.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly cls: IClsStore<AppClsStore>,
    private readonly dataServices: IDataServices,
  ) {}

  async canActivate(): Promise<boolean> {
    const isPublic = this.cls.get<boolean>('isPublic');
    if (isPublic) {
      return true;
    }
    const isAdmin = this.cls.get<boolean>('isAdmin');
    if (isAdmin) {
      const payload = this.cls.get<any>('payload');
      if (!payload) {
        throw new AppUnauthorizedException(
          'Invalid token. Please login again.',
        );
      }
      const admin = await this.dataServices.admin.getOneOrNull({
        email: payload.sub,
      });
      if (!admin) {
        throw new AppUnauthorizedException(
          'Invalid token. Please login again.',
        );
      }
      this.cls.set('adminUser', admin);
    }

    return true;
  }
}
