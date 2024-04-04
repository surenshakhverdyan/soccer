import { Module } from '@nestjs/common';

import { TeamsService } from './teams.service';

@Module({
  providers: [TeamsService],
})
export class TeamsModule {}
