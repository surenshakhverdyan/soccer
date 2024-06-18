import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { JoinsModule } from 'src/joins/joins.module';

@Module({
  imports: [UsersModule, TokenModule, JoinsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
