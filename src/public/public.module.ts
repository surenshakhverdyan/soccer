import { Module } from '@nestjs/common';

import { JoinController } from './join/join.controller';
import { JoinsModule } from 'src/joins/joins.module';
import { ImageController } from './image/image.controller';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [JoinsModule, ImagesModule],
  controllers: [JoinController, ImageController],
})
export class PublicModule {}
