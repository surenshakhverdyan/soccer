import { Controller, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
