import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards';
import { TransferService } from './transfer.service';
import { Types } from 'mongoose';

@UseGuards(AuthGuard)
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('create-transfer')
  createTransfer(@Body('playerId') playerId: Types.ObjectId) {
    return this.transferService.createTransfer(playerId);
  }
}
