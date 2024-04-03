import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AdminModule {}
