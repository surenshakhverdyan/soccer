import { HttpException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { PlayersService } from 'src/players/players.service';
import { ScheduleCreateDto } from 'src/schedules/dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Player, Schedule } from 'src/schemas';
import { Timeline } from 'src/schemas/game-timeline.schema';
import { TimeLineService } from 'src/time-line/time-line.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly tokenService: TokenService,
    private readonly playersService: PlayersService,
    private readonly timeLineService: TimeLineService,
  ) {}

  async createSchedule(
    dto: ScheduleCreateDto,
    token: string,
  ): Promise<Schedule> {
    try {
      const payload = this.tokenService.verifyToken(token);
      const [team, game] = payload.sub.toString().split(' ');
      const players: Array<Types.ObjectId> = [];

      dto.team = new Types.ObjectId(team);
      dto.game = new Types.ObjectId(game);

      if (await this.schedulesService.getByTeamAndGameIds(dto.team, dto.game))
        throw new HttpException('You have already scheduled the game', 403);

      dto.players.map((playerId) => {
        players.push(new Types.ObjectId(playerId));
      });
      dto.players = players;

      const schedule = await this.schedulesService.create(dto);

      return schedule;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async getPlayersByTeamId(token: string): Promise<Player[]> {
    const payload = this.tokenService.verifyToken(token);
    const [team] = payload.sub.toString().split(' ');
    const teamId = new Types.ObjectId(team);
    const players = await this.playersService.getByTeamId(teamId);

    return players;
  }

  async getTimeLine(token: string): Promise<Timeline> {
    const payload = this.tokenService.verifyToken(token);
    const [, game] = payload.sub.toString().split(' ');
    const timeLine = await this.timeLineService.getByGameId(
      new Types.ObjectId(game),
    );

    return timeLine;
  }

  async getScheduleByGameId(token: string): Promise<Schedule[]> {
    const payload = this.tokenService.verifyToken(token);
    const [, game] = payload.sub.toString().split(' ');
    const schedule = await this.schedulesService.getByGameId(
      new Types.ObjectId(game),
    );

    return schedule;
  }
}
