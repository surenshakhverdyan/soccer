import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Transfer } from 'src/schemas';
import { TransferCreateDto } from './dto';
import { Status } from 'src/enums';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer.name) private readonly transferModel: Model<Transfer>,
  ) {}

  async create(dto: TransferCreateDto): Promise<Transfer> {
    const transfer = await this.transferModel.create(dto);

    return transfer;
  }

  async update(
    transferId: Types.ObjectId,
    status: Status,
    session?: ClientSession,
  ): Promise<Transfer> {
    const transfer = await this.transferModel.findByIdAndUpdate(
      transferId,
      { $set: { status } },
      { new: true, session },
    );

    return transfer;
  }

  async getAllPending(): Promise<Transfer[]> {
    const transfers = await this.transferModel.find({ status: Status.Pending });

    return transfers;
  }

  async getAll(): Promise<Transfer[]> {
    const transfers = await this.transferModel.find();

    return transfers;
  }

  async getMyTransfers(teamId: Types.ObjectId): Promise<Transfer[]> {
    const transfers = await this.transferModel
      .find({ $or: [{ toTeam: teamId }, { fromTeam: teamId }] })
      .populate({
        path: 'fromTeam',
        model: 'Team',
        select: 'name',
      })
      .populate({
        path: 'toTeam',
        model: 'Team',
        select: 'name',
      })
      .populate({
        path: 'player',
        model: 'Player',
      });

    return transfers;
  }
}
