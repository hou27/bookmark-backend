import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      return false;
    }

    if (this.validateAuthorizationHeader(authorization)) {
      return false;
    }

    const [username, password] = this.decodeAuthorization(authorization);

    if (
      username === this.configService.get('ADMIN_USERNAME') &&
      password === this.configService.get('ADMIN_PASSWORD')
    ) {
      return true;
    }

    return false;
  }

  private validateAuthorizationHeader(authorization: string) {
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Basic' || !token) {
      return false;
    }
  }

  private decodeAuthorization(authorization: string) {
    const [_, token] = authorization.split(' ');
    const basicAuth = Buffer.from(token, 'base64').toString('utf-8');
    return basicAuth.split(':');
  }
}
