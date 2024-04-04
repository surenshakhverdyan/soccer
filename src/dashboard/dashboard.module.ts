import { Module } from '@nestjs/common';

import { TeamController } from './team/team.controller';
import { TeamService } from './team/team.service';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TeamsModule, PlayersModule, ImagesModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class DashboardModule {}
