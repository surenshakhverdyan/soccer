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
import { ApiBody, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards';
import { TeamService } from './team.service';
import { TeamCreateDto } from './dto';
import { Team } from 'src/schemas';
import { Position } from 'src/enums';

@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
        'players[0][name]': { type: 'string' },
        'players[0][number]': { type: 'integer' },
        'players[0][position]': {
          type: 'string',
          enum: Object.values(Position),
        },
        'players[0][avatar]': { type: 'string', format: 'binary' },
        'players[1][name]': { type: 'string' },
        'players[1][number]': { type: 'integer' },
        'players[1][position]': {
          type: 'string',
          enum: Object.values(Position),
        },
        'players[1][avatar]': { type: 'string', format: 'binary' },
      },
    },
  })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
