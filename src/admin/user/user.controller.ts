import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/users/dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create-user')
  createUser(@Body() dto: UserCreateDto): Promise<boolean> {
    return this.usersService.createUser(dto);
  }
}
