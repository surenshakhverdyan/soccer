import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/schemas';

@Controller('player')
export class PlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @Get(':id')
  getPlayer(@Param('id') id: Types.ObjectId): Promise<Player> {
    return this.playersService.getById(id);
  }
}
