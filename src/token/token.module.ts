import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { PayloadService } from './payload.service';

@Module({
  imports: [JwtModule],
  providers: [TokenService, PayloadService],
  exports: [TokenService, PayloadService],
})
export class TokenModule {}
