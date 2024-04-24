import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

import { PlayersService } from 'src/players/players.service';
import { TeamsService } from 'src/teams/teams.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { Status } from 'src/enums';

@Injectable()
export class TransferService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
    private readonly transfersService: TransfersService,
  ) {}

  async transfer(
    transferId: Types.ObjectId,
    status: boolean,
  ): Promise<boolean> {
    if (!status) {
      await this.transfersService.update(transferId, Status.Declined);

      return true;
    }

    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const transfer = await this.transfersService.update(
        transferId,
        Status.Transferred,
        session,
      );

      await this.teamsService.deletePlayer(
        transfer.fromTeam,
        transfer.player,
        session,
      );

      await this.teamsService.addPlayers(
        [transfer.player],
        transfer.toTeam,
        session,
      );

      const dto = { team: transfer.toTeam, playerId: transfer.player };

      await this.playersService.update(dto, session);

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
