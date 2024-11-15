import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { PlayerService } from './player.service';
import { Team } from 'src/schemas';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('admin')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Delete('delete-player')
  @ApiBody({
    schema: {
      properties: {
        playerId: { type: 'string' },
      },
    },
  })
  deletePlayer(@Body('playerId') playerId: Types.ObjectId): Promise<Team> {
    return this.playerService.deletePlayer(playerId);
  }
}
