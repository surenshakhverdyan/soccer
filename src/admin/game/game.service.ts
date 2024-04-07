import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BasketsService } from 'src/baskets/baskets.service';

import { GameCreateDto } from 'src/games/dto';
import { GamesService } from 'src/games/games.service';
import { Game } from 'src/schemas';

@Injectable()
export class GameService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly gamesService: GamesService,
    private readonly mailerService: MailerService,
    private readonly basketsService: BasketsService,
  ) {}

  async createGame(dto: GameCreateDto): Promise<Game> {
    // const session = await this.connection.startSession();

    try {
      // session.startTransaction();

      const basket = await this.basketsService.getById(dto.basket);

      basket.teams.map((team) => {
        console.log(team);
      });

      const game = await this.gamesService.create(dto);

      // await session.commitTransaction();
      // session.endSession();

      return game;
    } catch (error: any) {
      // await session.abortTransaction();
      // session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
