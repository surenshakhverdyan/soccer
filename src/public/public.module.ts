import { Module } from '@nestjs/common';

import { JoinController } from './join/join.controller';
import { JoinsModule } from 'src/joins/joins.module';
import { ImageController } from './image/image.controller';
import { ImagesModule } from 'src/images/images.module';
import { LeagueController } from './league/league.controller';
import { LeaguesModule } from 'src/leagues/leagues.module';

@Module({
  imports: [JoinsModule, ImagesModule, LeaguesModule],
  controllers: [JoinController, ImageController, LeagueController],
})
export class PublicModule {}
