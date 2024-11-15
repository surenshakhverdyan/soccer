import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards';
import { UserService } from './user.service';
import { UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update-profile')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
      },
    },
  })
  updateProfile(@Body() dto: UserUpdateDto): Promise<IUser> {
    return this.userService.updateProfile(dto);
  }

  @Patch('password-update')
  @ApiBody({
    schema: {
      properties: {
        currentPassword: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
      },
    },
  })
  passwordUpdate(@Body() dto: UserUpdateDto): Promise<boolean> {
    return this.userService.passwordUpdate(dto);
  }
}
