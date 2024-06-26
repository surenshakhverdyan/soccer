import {
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { GameService } from './game.service';
import { GameCreateDto } from 'src/games/dto';
import { Game } from 'src/schemas';
import { GameMediaDto, GameSetDto, GameUpdateDto } from './dto';
import { GamesService } from 'src/games/games.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gamesService: GamesService,
  ) {}

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

  @Post('update-game-media')
  @UseInterceptors(FilesInterceptor('image'))
  updateGameMedia(
    @Body() dto: GameMediaDto,
    @UploadedFiles(new ParseFilePipe({ fileIsRequired: false }))
    images?: Express.Multer.File[],
  ): Promise<boolean> {
    return this.gameService.updateGameMedia(dto, images);
  }

  @Get('get-active-games')
  getActiveGames(): Promise<Game[]> {
    return this.gamesService.getActiveGames();
  }
}
