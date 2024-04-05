import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async updateProfile(dto: UserUpdateDto): Promise<IUser> {
    const token = this.tokenService.extractToken(this.request);
    const refreshToken = this.request.header('refresh-token');
    const { sub } = this.tokenService.decode(token);
    const _user = await this.usersService.update(dto, sub);
    const user = this.usersService.generateUserResponse(
      _user,
      token,
      refreshToken,
    );

    return user;
  }

  async passwordUpdate(dto: UserUpdateDto): Promise<boolean> {
    const token = this.tokenService.extractToken(this.request);
    const { sub } = this.tokenService.decode(token);
    const _user = await this.usersService.getById(sub);

    if (!(await bcrypt.compare(dto.currentPassword, _user.password)))
      throw new HttpException('The current password was wrong', 403);

    if (dto.password !== dto.passwordConfirm)
      throw new HttpException('The passwords must match', 403);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    delete dto.currentPassword;
    delete dto.passwordConfirm;
    dto.password = hashedPassword;

    await this.usersService.update(dto, sub);

    return true;
  }
}
