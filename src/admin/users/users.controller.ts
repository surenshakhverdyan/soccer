import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { UsersService } from './users.service';
import { UserCreateDto } from 'src/user/dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  createUser(@Body() dto: UserCreateDto): Promise<boolean> {
    return this.usersService.createUser(dto);
  }
}
