import { MailerService } from '@nestjs-modules/mailer';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

import { PayloadService } from 'src/token/payload.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { SignInDto, SignUpDto } from './dto';
import { Role, Status, TokenType } from 'src/enums';
import { passwordResetTemplate } from 'src/templates';
import { UserCreateDto, UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';
import { JoinsService } from 'src/joins/joins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly payloadService: PayloadService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly joinsService: JoinsService,
  ) {}

  async signIn(dto: SignInDto): Promise<IUser> {
    const _user = await this.userService.getByEmail(dto.email);

    if (!_user) throw new HttpException('User not found', 404);
    if (!(await bcrypt.compare(dto.password, _user.password)))
      throw new UnauthorizedException();

    const payload = this.payloadService.generatePayload(
      _user,
      TokenType.AuthToken,
    );
    const authToken = this.tokenService.signAuthToken(payload);
    payload.type = TokenType.RefreshToken;
    const refreshToken = this.tokenService.signRefreshToken(payload);
    const user = this.userService.generateUserResponse(
      _user,
      authToken,
      refreshToken,
    );

    return user;
  }

  async signUp(dto: SignUpDto): Promise<IUser> {
    const join = await this.joinsService.getByEmail(dto.email);

    if (!join) throw new HttpException('Access denied', 403);
    if (join.status !== Status.Accepted)
      throw new HttpException('Access denied', 403);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashedPassword;
    dto.role = Role.User;

    const _user = await this.userService.create(dto as UserCreateDto);
    const payload = this.payloadService.generatePayload(
      _user,
      TokenType.AuthToken,
    );
    const authToken = this.tokenService.signAuthToken(payload);
    payload.type = TokenType.RefreshToken;
    const refreshToken = this.tokenService.signRefreshToken(payload);
    const user = this.userService.generateUserResponse(
      _user,
      authToken,
      refreshToken,
    );

    return user;
  }

  refreshToken(request: Request): string {
    const token = request.header('refresh-token');
    const payload = this.tokenService.decode(token);

    delete payload.exp;
    delete payload.iat;
    payload.type = TokenType.AuthToken;

    const authToken = this.tokenService.signAuthToken(payload);

    return authToken;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const _user = await this.userService.getByEmail(email);

    if (!_user) throw new HttpException('User not found', 404);

    const payload = this.payloadService.generatePayload(
      _user,
      TokenType.ForgotPasswordToken,
    );
    const token = this.tokenService.signPasswordResetToken(payload);
    const url = `${this.configService.get<string>(
      'BASE_URL',
    )}/password-reset/${token}`;
    const template = passwordResetTemplate(url);

    await this.mailerService.sendMail({
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      to: email,
      subject: 'Password reset',
      html: template,
    });

    return true;
  }

  async passwordReset(dto: UserUpdateDto, token: string): Promise<boolean> {
    const { sub } = this.tokenService.verifyToken(token);

    if (!dto.password)
      throw new HttpException('The passwords must not be empty', 403);
    if (dto.password !== dto.passwordConfirm)
      throw new HttpException('The passwords must match', 403);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    dto.password = hashedPassword;
    delete dto.passwordConfirm;

    const _user = await this.userService.update(dto, sub);

    if (!_user) throw new HttpException('User update failed', 500);

    return true;
  }
}
