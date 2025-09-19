import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_HIERARCHY } from '../../libs/auth/src/index';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>('roles', context.getHandler());
    if (!required || required.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;
    // role inheritance: check if user's role >= any required
    const has = required.some(r => ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[r]);
    return has;
  }
}
