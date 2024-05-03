import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { BasketCreateDto } from 'src/baskets/dto';
import { AdminGuard } from 'src/guards';
import { Basket } from 'src/schemas';
import { BasketService } from './basket.service';
import { BasketsService } from 'src/baskets/baskets.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    private readonly basketsService: BasketsService,
  ) {}

  @Post('create-basket')
  createBasket(@Body() dto: BasketCreateDto): Promise<Basket> {
    return this.basketService.createBasket(dto);
  }

  @Get('league-baskets/:leagueId')
  getLeagueBaskets(
    @Param('leagueId') leagueId: Types.ObjectId,
  ): Promise<Basket[]> {
    return this.basketsService.getByLeagueId(leagueId);
  }
}
