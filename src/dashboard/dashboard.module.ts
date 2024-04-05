import { Module } from '@nestjs/common';

import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { ImagesModule } from 'src/images/images.module';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TransferController } from './transfer/transfer.controller';
import { TransferService } from './transfer/transfer.service';
import { TransfersModule } from 'src/transfers/transfers.module';
import { CronsModule } from 'src/crons/crons.module';

@Module({
  imports: [
    TeamsModule,
    PlayersModule,
    ImagesModule,
    UsersModule,
    TokenModule,
    TransfersModule,
    CronsModule,
  ],
  controllers: [
    TeamController,
    PlayerController,
    UserController,
    TransferController,
  ],
  providers: [TeamService, PlayerService, UserService, TransferService],
})
export class DashboardModule {}
