import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  async upload(image: Express.Multer.File): Promise<string> {
    const fileName = `${
      Date.now() + Math.floor(Math.random() * 99999)
    }${extname(image.originalname)}`;

    fs.writeFileSync(`uploads/${fileName}`, image.buffer);

    return fileName;
  }
}
