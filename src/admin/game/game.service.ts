import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

import { BasketsService } from 'src/baskets/baskets.service';
import { Role, Status, TokenType } from 'src/enums';
import { GameCreateDto } from 'src/games/dto';
import { GamesService } from 'src/games/games.service';
import { LeaguesService } from 'src/leagues/leagues.service';
import { Game } from 'src/schemas';
import { gameDateTimeTemplate, scheduleGameTemplate } from 'src/templates';
import { TokenService } from 'src/token/token.service';
import { GameSetDto } from './dto';
import { PlayersService } from 'src/players/players.service';
import { SchedulesService } from 'src/schedules/schedules.service';

@Injectable()
export class GameService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly gamesService: GamesService,
    private readonly mailerService: MailerService,
    private readonly basketsService: BasketsService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly leaguesService: LeaguesService,
    private readonly playersService: PlayersService,
    private readonly schedulesService: SchedulesService,
  ) {}

  async createGame(dto: GameCreateDto): Promise<Game> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      dto.basket = new Types.ObjectId(dto.basket);
      dto.league = new Types.ObjectId(dto.league);

      const basket = await this.basketsService.getById(dto.basket);
      const game = await this.gamesService.create(dto, session);

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

      await this.leaguesService.addGame(dto.league, game._id, session);

      await session.commitTransaction();
      session.endSession();

      return game;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async setGame(dto: GameSetDto): Promise<Game> {
    const team_1 = await this.schedulesService.getById(dto.team_1);
    const team_2 = await this.schedulesService.getById(dto.team_2);
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const data = {
        gameId: team_1.game,
        team_1: {
          team: team_1.team._id,
          players: team_1.players,
        },
        team_2: {
          team: team_2.team._id,
          players: team_2.players,
        },
        startDateTime: dto.startDateTime,
        status: Status.Active,
      };

      const game = await this.gamesService.setGame(data, session);
      await this.playersService.findByTeamAndActivate(team_1.team._id, session);
      await this.playersService.findByTeamAndActivate(team_2.team._id, session);

      const template = gameDateTimeTemplate({
        dateTime: data.startDateTime,
        team_1: team_1.team.name,
        team_2: team_2.team.name,
      });
      const emails = [team_1.team.user.email, team_2.team.user.email];
      for (let i = 0; i < emails.length; i++) {
        await this.mailerService.sendMail({
          from: this.configService.get<string>('EMAIL_ADDRESS'),
          to: emails[i],
          subject: 'Game date and time',
          html: template,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return game;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async updateGame() {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      await session.commitTransaction();
      session.endSession();
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
