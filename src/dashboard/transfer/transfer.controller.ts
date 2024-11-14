import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AuthGuard } from 'src/guards';
import { TransferService } from './transfer.service';
import { Transfer } from 'src/schemas';

@UseGuards(AuthGuard)
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('create-transfer')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      properties: {
        playerId: { type: 'string' },
      },
    },
  })
  createTransfer(
    @Body('playerId') playerId: Types.ObjectId,
  ): Promise<Transfer> {
    return this.transferService.createTransfer(playerId);
  }

  @Get('my-transfers')
  @ApiBearerAuth()
  getMyTransfers(): Promise<Transfer[]> {
    return this.transferService.getMyTransfers();
  }
}
