import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { CronController } from './cron/cron.controller';
import { CronsModule } from 'src/crons/crons.module';
import { TransferController } from './transfer/transfer.controller';
import { TransferService } from './transfer/transfer.service';
import { TransfersModule } from 'src/transfers/transfers.module';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { JoinController } from './join/join.controller';
import { JoinService } from './join/join.service';
import { JoinsModule } from 'src/joins/joins.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    CronsModule,
    TransfersModule,
    TeamsModule,
    PlayersModule,
    JoinsModule,
  ],
  controllers: [
    UserController,
    ProfileController,
    CronController,
    TransferController,
    JoinController,
  ],
  providers: [UserService, ProfileService, TransferService, JoinService],
})
export class AdminModule {}
