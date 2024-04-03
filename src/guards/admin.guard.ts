import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from 'src/token/token.service';
import { Role, TokenType } from 'src/enums';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.tokenService.extractToken(request);

    if (!token) throw new UnauthorizedException();

    const payload = this.tokenService.verifyToken(token);

    if (payload.type !== TokenType.AuthToken && payload.role !== Role.Admin)
      throw new UnauthorizedException();

    return true;
  }
}
