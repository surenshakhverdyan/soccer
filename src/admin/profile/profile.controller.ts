import { Controller, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { ProfileService } from './profile.service';

@UseGuards(AdminGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
}
