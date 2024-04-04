import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { IUser } from 'src/users/interfaces';
import { RefreshTokenGuard } from 'src/guards';
import { UserUpdateDto } from 'src/users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() dto: SignInDto): Promise<IUser> {
    return this.authService.signIn(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Req() request: Request): string {
    return this.authService.refreshToken(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }

  @Patch('password-reset/:token')
  passwordReset(
    @Body() dto: UserUpdateDto,
    @Param('token') token: string,
  ): Promise<boolean> {
    return this.authService.passwordReset(dto, token);
  }
}
