import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesService } from './games.service';
import { Game, GameSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
