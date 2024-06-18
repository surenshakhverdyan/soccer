import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Join } from 'src/schemas';
import { JoinCreateDto, JoinUpdateDto } from './dto';

@Injectable()
export class JoinsService {
  constructor(
    @InjectModel(Join.name) private readonly joinModel: Model<Join>,
  ) {}

  async create(dto: JoinCreateDto): Promise<Join> {
    try {
      const join = await this.joinModel.create(dto);

      return join;
    } catch (error: any) {
      throw new HttpException(error.message, 403);
    }
  }

  async update(dto: JoinUpdateDto): Promise<Join> {
    const join = await this.joinModel.findByIdAndUpdate(
      dto.joinId,
      { $set: { status: dto.status } },
      { new: true },
    );

    return join;
  }

  async getAll(): Promise<Join[]> {
    const joins = await this.joinModel.find();

    return joins;
  }

  async getByEmail(email: string): Promise<Join> {
    const join = await this.joinModel.findOne({ email });

    return join;
  }
}
