import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards';
import { UserService } from './user.service';
import { UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update-profile')
  updateProfile(@Body() dto: UserUpdateDto): Promise<IUser> {
    return this.userService.updateProfile(dto);
  }

  @Patch('password-update')
  passwordUpdate(@Body() dto: UserUpdateDto): Promise<boolean> {
    return this.userService.passwordUpdate(dto);
  }
}
