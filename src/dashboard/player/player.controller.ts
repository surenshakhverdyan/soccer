import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PlayerService } from './player.service';
import { PlayerCreateDto } from 'src/players/dto';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@Controller('team')
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
}
