import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { Request } from 'express';

import { PlayersService } from 'src/players/players.service';
import { Team } from 'src/schemas';
import { TeamsService } from 'src/teams/teams.service';
import { TeamCreateDto } from './dto';
import { ImagesService } from 'src/images/images.service';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(REQUEST) private readonly request: Request,
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async createTeam(
    dto: TeamCreateDto,
    avatars?: Express.Multer.File[],
  ): Promise<Team> {
    const token = this.tokenService.extractToken(this.request);
    const { sub } = this.tokenService.decode(token);
    const _user = await this.usersService.getById(sub);

    if (_user.team)
      throw new HttpException('You have already created the team', 403);

    if (avatars['avatar'] !== undefined) {
      const avatar = await this.imagesService.upload(avatars['avatar'][0]);
      dto.avatar = avatar;
    }

    dto.user = _user._id;

    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const teamData = {
        name: dto.name,
        user: dto.user,
        avatar: dto.avatar,
      };
      const _team = await this.teamsService.create(teamData, session);

      await this.usersService.update({ team: _team._id }, _user._id, session);
      const players: Array<Types.ObjectId> = [];

      for (let i = 0; i < dto.players.length; i++) {
        const element = dto.players[i];

        if (avatars[`players[${i}][avatar]`] !== undefined) {
          const avatar = await this.imagesService.upload(
            avatars[`players[${i}][avatar]`][0],
          );
          element.avatar = avatar;
        }

        element.team = _team._id;

        const player = await this.playersService.create(element, session);
        players.push(player._id);
      }

      await this.teamsService.addPlayers(players, _team._id, session);

      await session.commitTransaction();
      session.endSession();

      const team = await this.teamsService.getById(_team._id);

      return team;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
