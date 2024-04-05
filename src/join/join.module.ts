import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JoinService } from './join.service';
import { Join, JoinSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Join.name, schema: JoinSchema }]),
  ],
  providers: [JoinService],
  exports: [JoinService],
})
export class JoinModule {}
