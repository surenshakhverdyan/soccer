import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/users/dto';
import { User } from 'src/schemas';
import { UsersService } from 'src/users/users.service';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('admin')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly usersService: UsersService,
  ) {}

  @Post('create-user')
  createUser(@Body() dto: UserCreateDto): Promise<boolean> {
    return this.userService.createUser(dto);
  }

  @Delete('delete-user')
  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'string' },
      },
    },
  })
  deleteUser(@Body('userId') userId: Types.ObjectId): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }

  @Get('get-users')
  getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
