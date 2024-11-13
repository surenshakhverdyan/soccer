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
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { TeamController } from './team/team.controller';
import { LeaguesModule } from 'src/leagues/leagues.module';
import { LeagueController } from './league/league.controller';
import { BasketController } from './basket/basket.controller';
import { BasketsModule } from 'src/baskets/baskets.module';
import { BasketService } from './basket/basket.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { GamesModule } from 'src/games/games.module';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { ImagesModule } from 'src/images/images.module';
import { ScheduleController } from './schedule/schedule.controller';
import { LeagueService } from './league/league.service';
import { TimeLineModule } from 'src/time-line/time-line.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    CronsModule,
    TransfersModule,
    TeamsModule,
    PlayersModule,
    JoinsModule,
    LeaguesModule,
    BasketsModule,
    GamesModule,
    SchedulesModule,
    ImagesModule,
    TimeLineModule,
  ],
  controllers: [
    UserController,
    ProfileController,
    CronController,
    TransferController,
    JoinController,
    PlayerController,
    TeamController,
    LeagueController,
    BasketController,
    GameController,
    ScheduleController,
  ],
  providers: [
    UserService,
    ProfileService,
    TransferService,
    JoinService,
    PlayerService,
    BasketService,
    GameService,
    LeagueService,
  ],
})
export class AdminModule {}
