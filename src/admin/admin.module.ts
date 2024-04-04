import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AdminModule {}
