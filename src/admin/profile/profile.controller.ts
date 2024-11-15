import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { AdminGuard } from 'src/guards';
import { ProfileService } from './profile.service';
import { UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('admin')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

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
    return this.profileService.updateProfile(dto);
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
    return this.profileService.passwordUpdate(dto);
  }
}
