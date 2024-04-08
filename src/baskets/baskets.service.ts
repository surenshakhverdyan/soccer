import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Basket } from 'src/schemas';
import { BasketCreateDto } from './dto';
import { IBasket } from './interfaces';

@Injectable()
export class BasketsService {
  constructor(
    @InjectModel(Basket.name) private readonly basketModel: Model<Basket>,
  ) {}

  async create(dto: BasketCreateDto, session?: ClientSession): Promise<Basket> {
    const [basket] = await this.basketModel.create([dto], { session });

    return basket;
  }

  async getById(basketId: Types.ObjectId): Promise<IBasket> {
    const basket: IBasket = await this.basketModel.findById(basketId).populate({
      path: 'teams',
      model: 'Team',
      select: '_id',
      populate: {
        path: 'user',
        model: 'User',
        select: 'email',
      },
    });

    return basket;
  }
}
