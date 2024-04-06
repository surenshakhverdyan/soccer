import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { PlayerService } from './player.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Delete('delete-player')
  deletePlayer(@Body('playerId') playerId: Types.ObjectId): Promise<boolean> {
    return this.playerService.deletePlayer(playerId);
  }
}
