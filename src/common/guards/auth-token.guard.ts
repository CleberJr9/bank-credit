import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      console.log(payload);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Acesso não autorizado');
    }
    return true;
  }

  extractTokenHeader(request: Request) {
    const authorization = request.headers?.authorization;
    if (
      !authorization ||
      typeof authorization !== 'string' ||
      authorization === undefined
    ) {
      return '';
    }
    return authorization.split(' ')[1];
  }
}
