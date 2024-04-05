import { Module } from '@nestjs/common';

import { JoinController } from './join/join.controller';
import { JoinsModule } from 'src/joins/joins.module';

@Module({
  imports: [JoinsModule],
  controllers: [JoinController],
})
export class PublicModule {}
