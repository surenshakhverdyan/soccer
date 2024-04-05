import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { CronController } from './cron/cron.controller';
import { CronsModule } from 'src/crons/crons.module';

@Module({
  imports: [UsersModule, TokenModule, CronsModule],
  controllers: [UserController, ProfileController, CronController],
  providers: [UserService, ProfileService],
})
export class AdminModule {}
