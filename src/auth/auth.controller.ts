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
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
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

  @Post('sign-up')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  signUp(@Body() dto: SignUpDto): Promise<IUser> {
    return this.authService.signUp(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'refresh-token',
    required: true,
  })
  @Post('refresh-token')
  refreshToken(@Req() request: Request): string {
    return this.authService.refreshToken(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
      },
    },
  })
  forgotPassword(@Body('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }

  @Patch('password-reset/:token')
  @ApiBody({
    schema: {
      properties: {
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
      },
    },
  })
  passwordReset(
    @Body() dto: UserUpdateDto,
    @Param('token') token: string,
  ): Promise<boolean> {
    return this.authService.passwordReset(dto, token);
  }
}
