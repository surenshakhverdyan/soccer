import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
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

  async delete(image: string): Promise<void> {
    fs.promises.unlink(`uploads/${image}`);
  }

  getImage(path: string): string {
    console.log(path);
    if (path === undefined) return '';

    const imagePath = join(__dirname, '../..', 'uploads', path);

    return imagePath;
  }
}
