import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransfersService } from './transfers.service';
import { Transfer, TransferSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
    ]),
  ],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
