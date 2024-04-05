import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Types } from 'mongoose';
import { Request } from 'express';

import { TransfersService } from 'src/transfers/transfers.service';
import { CronsService } from 'src/crons/crons.service';
import { Transfer } from 'src/schemas';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class TransferService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly transfersService: TransfersService,
    private readonly cronsService: CronsService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly playersService: PlayersService,
  ) {}

  async createTransfer(playerId: Types.ObjectId): Promise<Transfer> {
    try {
      const cron = await this.cronsService.get();
      const endTransfers = new Date(cron.endTransfers).getTime();

      if (Date.now() > endTransfers)
        throw new HttpException('Transfers are closed', 403);

      const token = this.tokenService.extractToken(this.request);
      const { sub } = this.tokenService.decode(token);
      const _user = await this.usersService.getById(sub);
      const player = await this.playersService.getById(playerId);
      const payload = {
        player: playerId,
        fromTeam: player.team,
        toTeam: _user.team,
      };
      const transfer = await this.transfersService.create(payload);

      return transfer;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
