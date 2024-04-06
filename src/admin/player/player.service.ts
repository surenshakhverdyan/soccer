import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

import { PlayersService } from 'src/players/players.service';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
  ) {}

  async deletePlayer(playerId: Types.ObjectId): Promise<boolean> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const player = await this.playersService.delete(playerId, session);
      await this.teamsService.deletePlayer(player.team, player._id, session);

      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
