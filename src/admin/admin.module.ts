import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService],
})
export class AdminModule {}
