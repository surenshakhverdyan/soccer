import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { AuthGuard } from 'src/guards';
import { TransferService } from './transfer.service';
import { Transfer } from 'src/schemas';

@UseGuards(AuthGuard)
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('create-transfer')
  createTransfer(
    @Body('playerId') playerId: Types.ObjectId,
  ): Promise<Transfer> {
    return this.transferService.createTransfer(playerId);
  }

  @Get('my-transfers')
  getMyTransfers(): Promise<Transfer[]> {
    return this.transferService.getMyTransfers();
  }
}
