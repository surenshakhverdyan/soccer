import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { TransferService } from './transfer.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { Transfer } from 'src/schemas';

@UseGuards(AdminGuard)
@Controller('admin')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
    private readonly transfersService: TransfersService,
  ) {}

  @Get('pending-transfers')
  getAllPending(): Promise<Transfer[]> {
    return this.transfersService.getAllPending();
  }
}
