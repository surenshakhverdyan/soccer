import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BasketsService } from './baskets.service';
import { Basket, BasketSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
  ],
  providers: [BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}
