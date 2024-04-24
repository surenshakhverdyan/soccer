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
import { GameMediaDto, GameSetDto, GameUpdateDto } from './dto';
import { PlayersService } from 'src/players/players.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { ImagesService } from 'src/images/images.service';

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
    private readonly imagesService: ImagesService,
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

      await this.schedulesService.delete(dto.team_1);
      await this.schedulesService.delete(dto.team_2);

      await session.commitTransaction();
      session.endSession();

      return game;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async updateGame(dto: GameUpdateDto): Promise<Game> {
    const _game = await this.gamesService.getById(dto.gameId);

    if (_game.status !== Status.Active)
      throw new HttpException('The game is ended', 403);

    const data = {
      gameId: dto.gameId,
      teamKey: _game.team_1.team.equals(dto.teamId) ? 'team_1' : 'team_2',
      goals: dto.goals,
      cards: dto.cards,
    };

    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const game = await this.gamesService.pushData(data, session);

      for (const card of dto.cards) {
        if (card.red) {
          const statistics = {
            playerId: card.player,
            fieldKey: 'redCards',
            value: card.red,
          };
          await this.playersService.updateStatistics(statistics, session);
        }

        if (card.yellow) {
          const statistics = {
            playerId: card.player,
            fieldKey: 'yellowCards',
            value: card.yellow,
          };
          await this.playersService.updateStatistics(statistics, session);
        }
      }

      for (const goal of dto.goals) {
        const goalStatistics = {
          playerId: goal.goal,
          fieldKey: 'goals',
          value: 1,
        };
        await this.playersService.updateStatistics(goalStatistics, session);

        if (goal.assist) {
          const assistStatistics = {
            playerId: goal.assist,
            fieldKey: 'assists',
            value: 1,
          };
          await this.playersService.updateStatistics(assistStatistics, session);
        }
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

  async calculateGame(gameId: Types.ObjectId): Promise<Game> {
    const _game = await this.gamesService.getById(gameId);

    if (_game.status !== Status.Active)
      throw new HttpException('The game is ended', 403);

    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      if (_game.team_1.goals.length > _game.team_2.goals.length) {
        const data = {
          leagueId: _game.league,
          teamId: _game.team_1.team,
          value: 3,
        };
        await this.leaguesService.updatePoint(data, session);
        await this.basketsService.removeTeam(
          _game.basket,
          _game.team_2.team,
          session,
        );
      } else if (_game.team_2.goals.length > _game.team_1.goals.length) {
        const data = {
          leagueId: _game.league,
          teamId: _game.team_2.team,
          value: 3,
        };
        await this.leaguesService.updatePoint(data, session);
        await this.basketsService.removeTeam(
          _game.basket,
          _game.team_1.team,
          session,
        );
      } else {
        const data = {
          leagueId: _game.league,
          teamId: _game.team_1.team,
          value: 1,
        };
        await this.leaguesService.updatePoint(data, session);

        data.teamId = _game.team_2.team;
        await this.leaguesService.updatePoint(data, session);
      }

      _game.status = Status.Ended;
      await _game.save({ session });

      await session.commitTransaction();
      session.endSession();

      return _game;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async updateGameMedia(
    dto: GameMediaDto,
    images?: Express.Multer.File[],
  ): Promise<boolean> {
    const _images: Array<string> = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const element = images[i];
        console.log(element);
        const _image = await this.imagesService.upload(element);
        _images.push(_image);
      }

      const data = {
        gameId: dto.gameId,
        url: dto.url,
        images: _images,
      };

      await this.gamesService.updateMedia(data);

      return true;
    } catch (error: any) {
      for (let i = 0; i < _images.length; i++) {
        const element = _images[i];
        await this.imagesService.delete(element);
      }

      throw new HttpException(error.message, 500);
    }
  }
}
