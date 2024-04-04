import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectConnection } from '@nestjs/mongoose';
import { Request } from 'express';
import { Connection } from 'mongoose';

import { PlayersService } from 'src/players/players.service';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(REQUEST) private readonly request: Request,
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}
}
