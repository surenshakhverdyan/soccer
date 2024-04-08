import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { BasketsService } from 'src/baskets/baskets.service';
import { Role, TokenType } from 'src/enums';
import { GameCreateDto } from 'src/games/dto';
import { GamesService } from 'src/games/games.service';
import { Game } from 'src/schemas';
import { scheduleGameTemplate } from 'src/templates';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class GameService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly gamesService: GamesService,
    private readonly mailerService: MailerService,
    private readonly basketsService: BasketsService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async createGame(dto: GameCreateDto): Promise<Game> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const basket = await this.basketsService.getById(dto.basket);

      const game = await this.gamesService.create(dto);

      basket.teams.map(async (team) => {
        const payload = {
          sub: `${team._id} ${game._id}`,
          role: Role.User,
          type: TokenType.GameScheduleToken,
        };
        const token = this.tokenService.signGameScheduleToken(payload);
        const url = `${this.configService.get<string>(
          'BASE_URL',
        )}/schedule-game/${token}`;
        const template = scheduleGameTemplate(url);

        await this.mailerService.sendMail({
          from: this.configService.get<string>('EMAIL_ADDRESS'),
          to: team.user.email,
          subject: 'Game scheduler',
          html: template,
        });
      });

      await session.commitTransaction();
      session.endSession();

      return game;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
