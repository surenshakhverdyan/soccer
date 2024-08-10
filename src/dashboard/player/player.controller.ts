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
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Types } from 'mongoose';

import { PlayerService } from './player.service';
import { PlayerCreateDto, PlayerUpdateDto } from 'src/players/dto';
import { AuthGuard } from 'src/guards';
import { Player, Team } from 'src/schemas';
import { PlayersService } from 'src/players/players.service';

@UseGuards(AuthGuard)
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly playersService: PlayersService,
  ) {}

  @Put('add-player')
  @UseInterceptors(FileInterceptor('avatar'))
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
    console.log('test');
    return this.playerService.addPlayer(dto, avatar);
  }

  @Put('update-player')
  @UseInterceptors(FileInterceptor('avatar'))
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
  deletePlayer(@Body() dto: PlayerUpdateDto): Promise<Team> {
    return this.playerService.deletePlayer(dto);
  }

  @Get('team-players/:teamId')
  getTeamPlayers(@Param('teamId') teamId: Types.ObjectId): Promise<Player[]> {
    return this.playersService.getByTeamId(new Types.ObjectId(teamId));
  }

  @Get('players-without-me')
  getPlayersWithoutMe(@Req() request: Request): Promise<Player[]> {
    return this.playerService.getPlayersWithoutMe(request);
  }
}
