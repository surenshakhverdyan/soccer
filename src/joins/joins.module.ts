import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JoinsService } from './joins.service';
import { Join, JoinSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Join.name, schema: JoinSchema }]),
  ],
  providers: [JoinsService],
  exports: [JoinsService],
})
export class JoinsModule {}
