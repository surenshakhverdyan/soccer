import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { User } from 'src/schemas';
import { IUser } from './interfaces';
import { UserCreateDto, UserUpdateDto } from './dto';
import { Role } from 'src/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    const _user = await this.userModel.findOne({ email });

    return _user;
  }

  async getById(sub: Types.ObjectId): Promise<User> {
    const _user = await this.userModel.findById(sub);

    return _user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel
      .find({ role: Role.User })
      .select('-password');

    return users;
  }

  async update(
    dto: UserUpdateDto,
    sub: Types.ObjectId,
    session?: ClientSession,
  ): Promise<User> {
    const _user = await this.userModel.findByIdAndUpdate(
      sub,
      { $set: dto },
      { new: true, session },
    );

    return _user;
  }

  async create(dto: UserCreateDto): Promise<User> {
    try {
      const _user = await this.userModel.create(dto);

      return _user;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  generateUserResponse(
    _user: User,
    authToken: string,
    refreshToken: string,
  ): IUser {
    const user = {
      id: _user._id,
      name: _user.name,
      email: _user.email,
      phone: _user.phone,
      role: _user.role,
      team: _user.team,
      authToken,
      refreshToken,
    };

    return user;
  }

  async delete(userId: Types.ObjectId, session?: ClientSession): Promise<User> {
    const _user = await this.userModel.findByIdAndDelete(userId, { session });

    return _user;
  }
}
