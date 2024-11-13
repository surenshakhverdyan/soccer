import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { TeamsService } from 'src/teams/teams.service';
import { welcomeTemplate } from 'src/templates';
import { UserCreateDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly teamsService: TeamsService,
    private readonly playersService: PlayersService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const template = welcomeTemplate(dto.email, dto.password);

    dto.password = hashedPassword;

    await this.usersService.create(dto);

    await this.mailerService.sendMail({
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      to: dto.email,
      subject: 'Welcome',
      html: template,
    });

    return true;
  }

  async deleteUser(userId: Types.ObjectId): Promise<boolean> {
    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      const _user = await this.usersService.delete(userId, session);
      await this.teamsService.delete(_user.team, session);
      await this.playersService.deleteMany(_user.team, session);

      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
