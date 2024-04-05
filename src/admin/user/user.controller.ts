import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/users/dto';
import { Types } from 'mongoose';

@UseGuards(AdminGuard)
@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUser(@Body() dto: UserCreateDto): Promise<boolean> {
    return this.userService.createUser(dto);
  }

  @Delete('delete-user')
  deleteUser(@Body('userId') userId: Types.ObjectId): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }
}
