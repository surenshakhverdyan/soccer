import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IPayload, IPayloadGSchedule } from './interfaces';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signAuthToken(payload: IPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return token;
  }

  signRefreshToken(payload: IPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });

    return token;
  }

  signPasswordResetToken(payload: IPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    return token;
  }

  signGameScheduleToken(payload: IPayloadGSchedule): string {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '5d',
    });

    return token;
  }

  verifyToken(token: string): IPayload {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return payload;
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  decode(token: string): IPayload {
    const payload = this.jwtService.decode(token);

    return payload;
  }

  extractToken(request: Request): string | undefined {
    const [key, token] = request.headers.authorization?.split(' ') ?? [];

    return key === 'Bearer' ? token : undefined;
  }
}
