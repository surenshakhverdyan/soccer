import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PlayerService } from './player.service';
import { PlayerCreateDto, PlayerUpdateDto } from 'src/players/dto';
import { AuthGuard } from 'src/guards';
import { Player, Team } from 'src/schemas';

@UseGuards(AuthGuard)
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

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
  ): Promise<Player> {
    return this.playerService.updatePlayer(dto, avatar);
  }

  @Delete('delete-player')
  deletePlayer(@Body() dto: PlayerUpdateDto): Promise<Team> {
    return this.playerService.deletePlayer(dto);
  }
}
