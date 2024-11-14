import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { GamesService } from 'src/games/games.service';
import { Game } from 'src/schemas';

@Controller('game')
export class GameController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':gameId')
  @ApiParam({ name: 'gameId', type: 'string', required: true })
  getGameById(@Param('gameId') gameId: Types.ObjectId): Promise<Game> {
    return this.gamesService.getById(gameId);
  }
}
