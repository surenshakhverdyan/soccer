import { Module } from '@nestjs/common';

import { ImagesService } from './images.service';

@Module({
  providers: [ImagesService],
})
export class ImagesModule {}
