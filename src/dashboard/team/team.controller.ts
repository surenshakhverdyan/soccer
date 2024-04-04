import { Controller, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards';
import { TeamService } from './team.service';

@UseGuards(AuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
}
