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
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { GameService } from './game.service';
import { GameCreateDto } from 'src/games/dto';
import { Game } from 'src/schemas';
import {
  GameMediaDto,
  GameSetDto,
  GameUpdateDto,
  setTechnicalDefeatDto,
} from './dto';
import { GamesService } from 'src/games/games.service';

@UseGuards(AdminGuard)
@ApiBearerAuth()
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
  @ApiBody({
    schema: {
      properties: {
        gameId: { type: 'string' },
      },
    },
  })
  calculateGame(@Body('gameId') gameId: Types.ObjectId): Promise<Game> {
    return this.gameService.calculateGame(gameId);
  }

  @Put('set-technical-defeat')
  setTechnicalDefeat(@Body() dto: setTechnicalDefeatDto): Promise<Game> {
    return this.gameService.setTechnicalDefeat(dto);
  }

  @Post('update-game-media')
  @UseInterceptors(FilesInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        gameId: { type: 'string' },
        url: { type: 'string' },
      },
    },
  })
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
