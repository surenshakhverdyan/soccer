import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from 'src/schemas';
import { IUser } from './interfaces';
import { UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });

      return user;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(dto: UserUpdateDto, sub: Types.ObjectId): Promise<User> {
    const _user = await this.userModel.findByIdAndUpdate(
      sub,
      { $set: dto },
      { new: true },
    );

    return _user;
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
}
