import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { welcomeTemplate } from 'src/templates';
import { UserCreateDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const template = welcomeTemplate(dto.email, dto.password);

    dto.password = hashedPassword;

    await this.userService.create(dto);

    await this.mailerService.sendMail({
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      to: dto.email,
      subject: 'Welcome',
      html: template,
    });

    return true;
  }
}
