import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Request } from 'express';

import { ImagesService } from 'src/images/images.service';
import { PlayerCreateDto, PlayerUpdateDto } from 'src/players/dto';
import { PlayersService } from 'src/players/players.service';
import { Player, Team } from 'src/schemas';
import { TeamsService } from 'src/teams/teams.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(REQUEST) private readonly request: Request,
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
    private readonly tokenService: TokenService,
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService,
  ) {}

  async addPlayer(
    dto: PlayerCreateDto,
    avatar?: Express.Multer.File,
  ): Promise<Team> {
    const token = this.tokenService.extractToken(this.request);
    const { sub } = this.tokenService.decode(token);
    const _user = await this.usersService.getById(sub);

    const session = await this.connection.startSession();

    try {
      if (avatar !== undefined) {
        const image = await this.imagesService.upload(avatar);
        dto.avatar = image;
      }

      dto.team = _user.team;

      session.startTransaction();

      const { _id } = await this.playersService.create(dto, session);

      await this.teamsService.addPlayers([_id], _user.team, session);

      await session.commitTransaction();
      session.endSession();

      const team = await this.teamsService.getById(_user.team);

      return team;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async updatePlayer(
    dto: PlayerUpdateDto,
    avatar?: Express.Multer.File,
  ): Promise<Player> {
    if (avatar !== undefined) {
      const image = await this.imagesService.upload(avatar);
      dto.avatar = image;
    }

    const player = await this.playersService.update(dto, dto.playerId);

    return player;
  }
}
