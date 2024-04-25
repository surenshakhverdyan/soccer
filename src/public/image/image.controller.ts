import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { ImagesService } from 'src/images/images.service';

@Controller('public/image')
export class ImageController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':image')
  getImage(@Param('image') path: string, @Res() res: Response): void {
    return res.sendFile(this.imagesService.getImage(path));
  }
}
