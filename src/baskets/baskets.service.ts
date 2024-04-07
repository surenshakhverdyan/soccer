import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Basket } from 'src/schemas';
import { BasketCreateDto } from './dto';

@Injectable()
export class BasketsService {
  constructor(
    @InjectModel(Basket.name) private readonly basketModel: Model<Basket>,
  ) {}

  async create(dto: BasketCreateDto, session?: ClientSession): Promise<Basket> {
    const [basket] = await this.basketModel.create([dto], { session });

    return basket;
  }
}
