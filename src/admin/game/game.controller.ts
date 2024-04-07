import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { GameService } from './game.service';
import { GameCreateDto } from 'src/games/dto';
import { Game } from 'src/schemas';

@UseGuards(AdminGuard)
@Controller('admin')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create-game')
  createGame(@Body() dto: GameCreateDto): Promise<Game> {
    return this.gameService.createGame(dto);
  }
}
