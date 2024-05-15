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
import { SchedulesModule } from 'src/schedules/schedules.module';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleService } from './schedule/schedule.service';
import { CronController } from './cron/cron.controller';
import { CronService } from './cron/cron.service';

@Module({
  imports: [
    TeamsModule,
    PlayersModule,
    ImagesModule,
    UsersModule,
    TokenModule,
    TransfersModule,
    CronsModule,
    SchedulesModule,
  ],
  controllers: [
    TeamController,
    PlayerController,
    UserController,
    TransferController,
    ScheduleController,
    CronController,
  ],
  providers: [
    TeamService,
    PlayerService,
    UserService,
    TransferService,
    ScheduleService,
    CronService,
  ],
})
export class DashboardModule {}
