import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Basket } from 'src/schemas';

@Injectable()
export class BasketsService {
  constructor(
    @InjectModel(Basket.name) private readonly basketModel: Model<Basket>,
  ) {}
}
