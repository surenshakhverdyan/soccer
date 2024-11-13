import {
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

import { AuthGuard } from 'src/guards';
import { TeamService } from './team.service';
import { TeamCreateDto } from './dto';
import { Team } from 'src/schemas';

@UseGuards(AuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create-team')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar' },
      ...Array.from({ length: 21 }, (_, index) => ({
        name: `players[${index}][avatar]`,
        maxCount: 1,
      })),
    ]),
  )
  createTeam(
    @Body() dto: TeamCreateDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    avatars?: Express.Multer.File[],
  ): Promise<Team> {
    return this.teamService.createTeam(dto, avatars);
  }

  @Patch('update-team')
  @UseInterceptors(FileInterceptor('avatar'))
  updateTeam(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'jpg|jpeg|png' })],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
    @Body('team') team?: string,
  ): Promise<Team> {
    return this.teamService.updateTeam(avatar, team);
  }
}
