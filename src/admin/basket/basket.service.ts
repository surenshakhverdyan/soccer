import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { BasketsService } from 'src/baskets/baskets.service';
import { BasketCreateDto } from 'src/baskets/dto';
import { LeaguesService } from 'src/leagues/leagues.service';
import { Basket } from 'src/schemas';

@Injectable()
export class BasketService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly basketsService: BasketsService,
    private readonly leaguesService: LeaguesService,
  ) {}

  async createBasket(dto: BasketCreateDto): Promise<Basket> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const basket = await this.basketsService.create(dto, session);
      await this.leaguesService.addBasket(dto.league, basket._id, session);

      await session.commitTransaction();
      session.endSession();

      return basket;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
