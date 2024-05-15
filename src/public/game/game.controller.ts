import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { GamesService } from 'src/games/games.service';
import { Game } from 'src/schemas';

@Controller('game')
export class GameController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':gameId')
  getGameById(@Param('gameId') gameId: Types.ObjectId): Promise<Game> {
    return this.gamesService.getById(gameId);
  }
}
