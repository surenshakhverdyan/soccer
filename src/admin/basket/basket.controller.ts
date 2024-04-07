import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BasketCreateDto } from 'src/baskets/dto';
import { AdminGuard } from 'src/guards';
import { Basket } from 'src/schemas';
import { BasketService } from './basket.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('create-basket')
  createBasket(@Body() dto: BasketCreateDto): Promise<Basket> {
    return this.basketService.createBasket(dto);
  }
}
