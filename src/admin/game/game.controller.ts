import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { GameService } from './game.service';
import { GameCreateDto } from 'src/games/dto';
import { Game } from 'src/schemas';
import { GameSetDto } from './dto';

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
}
