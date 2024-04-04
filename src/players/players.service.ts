import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Player } from 'src/schemas';
import { PlayerCreateDto, PlayerUpdateDto } from './dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async create(dto: PlayerCreateDto, session?: ClientSession): Promise<Player> {
    const [player] = await this.playerModel.create([dto], { session });

    return player;
  }

  async update(
    dto: PlayerUpdateDto,
    playerId: Types.ObjectId,
  ): Promise<Player> {
    const player = await this.playerModel.findByIdAndUpdate(
      playerId,
      { $set: dto },
      { new: true },
    );

    return player;
  }
}
