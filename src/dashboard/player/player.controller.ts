import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Types } from 'mongoose';

import { PlayerService } from './player.service';
import { PlayerCreateDto, PlayerUpdateDto } from 'src/players/dto';
import { AuthGuard } from 'src/guards';
import { Player, Team } from 'src/schemas';
import { PlayersService } from 'src/players/players.service';
import { Position } from 'src/enums';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly playersService: PlayersService,
  ) {}

  @Put('add-player')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        number: { type: 'number' },
        position: { type: 'string', enum: Object.values(Position) },
        avatar: { type: 'string', format: 'binary' },
      },
      required: ['name', 'number', 'position'],
    },
  })
  addPlayer(
    @Body() dto: PlayerCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'jpg|jpeg|png' })],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
  ) {
    return this.playerService.addPlayer(dto, avatar);
  }

  @Put('update-player')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        number: { type: 'string' },
        position: { type: 'string', enum: Object.values(Position) },
        avatar: { type: 'string', format: 'binary' },
      },
    },
  })
  updatePlayer(
    @Body() dto: PlayerUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'jpg|jpeg|png' })],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
  ): Promise<Team> {
    return this.playerService.updatePlayer(dto, avatar);
  }

  @Delete('delete-player')
  @ApiBody({
    schema: {
      properties: {
        playerId: { type: 'string' },
      },
    },
  })
  deletePlayer(@Body() dto: PlayerUpdateDto): Promise<Team> {
    return this.playerService.deletePlayer(dto);
  }

  @Get('team-players/:teamId')
  @ApiParam({ name: 'teamId', type: 'string', required: true })
  getTeamPlayers(@Param('teamId') teamId: Types.ObjectId): Promise<Player[]> {
    return this.playersService.getByTeamId(new Types.ObjectId(teamId));
  }

  @Get('players-without-me')
  getPlayersWithoutMe(@Req() request: Request): Promise<Player[]> {
    return this.playerService.getPlayersWithoutMe(request);
  }
}
