import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { GameService } from './game.service';
import { GameCreateDto } from 'src/games/dto';
import { Game } from 'src/schemas';
import { GameSetDto, GameUpdateDto } from './dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create-game')
  createGame(@Body() dto: GameCreateDto): Promise<Game> {
    return this.gameService.createGame(dto);
  }

  @Put('set-game')
  setGame(@Body() dto: GameSetDto): Promise<Game> {
    return this.gameService.setGame(dto);
  }

  @Put('update-game')
  updateGame(@Body() dto: GameUpdateDto): Promise<Game> {
    return this.gameService.updateGame(dto);
  }

  @Put('calculate-game')
  calculateGame(@Body('gameId') gameId: Types.ObjectId): Promise<Game> {
    return this.gameService.calculateGame(gameId);
  }
}
