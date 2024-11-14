import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AdminGuard } from 'src/guards';
import { TransferService } from './transfer.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { Transfer } from 'src/schemas';
import { TransferDto } from './dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
    private readonly transfersService: TransfersService,
  ) {}

  @Get('pending-transfers')
  @ApiBearerAuth()
  getAllPending(): Promise<Transfer[]> {
    return this.transfersService.getAllPending();
  }

  @Put('transfer')
  @ApiBearerAuth()
  transfer(@Body() dto: TransferDto): Promise<boolean> {
    return this.transferService.transfer(dto.transferId, dto.status);
  }
}
