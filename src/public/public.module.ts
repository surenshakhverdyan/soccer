import { Module } from '@nestjs/common';

import { JoinController } from './join/join.controller';
import { JoinsModule } from 'src/joins/joins.module';
import { ImageController } from './image/image.controller';
import { ImagesModule } from 'src/images/images.module';
import { LeagueController } from './league/league.controller';
import { LeaguesModule } from 'src/leagues/leagues.module';
import { TeamsModule } from 'src/teams/teams.module';
import { TeamController } from './team/team.controller';
import { PlayersModule } from 'src/players/players.module';
import { PlayerController } from './player/player.controller';
import { GamesModule } from 'src/games/games.module';
import { GameController } from './game/game.controller';

@Module({
  imports: [
    JoinsModule,
    ImagesModule,
    LeaguesModule,
    TeamsModule,
    PlayersModule,
    GamesModule,
  ],
  controllers: [
    JoinController,
    ImageController,
    LeagueController,
    TeamController,
    PlayerController,
    GameController,
  ],
})
export class PublicModule {}
