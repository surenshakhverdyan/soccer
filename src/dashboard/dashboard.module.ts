import { Module } from '@nestjs/common';

import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { ImagesModule } from 'src/images/images.module';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TeamsModule, PlayersModule, ImagesModule, UsersModule, TokenModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class DashboardModule {}
