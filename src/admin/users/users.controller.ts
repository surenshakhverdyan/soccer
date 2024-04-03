import { Controller, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { UsersService } from './users.service';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
