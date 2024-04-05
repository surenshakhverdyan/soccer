import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { ProfileService } from './profile.service';
import { UserUpdateDto } from 'src/users/dto';
import { IUser } from 'src/users/interfaces';

@UseGuards(AdminGuard)
@Controller('admin')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('update-profile')
  updateProfile(@Body() dto: UserUpdateDto): Promise<IUser> {
    return this.profileService.updateProfile(dto);
  }

  @Patch('password-update')
  passwordUpdate(@Body() dto: UserUpdateDto): Promise<boolean> {
    return this.profileService.passwordUpdate(dto);
  }
}
