import { Types } from 'mongoose';

export interface ISchedule {
  _id: Types.ObjectId;
  game: Types.ObjectId;
  team?: {
    _id?: Types.ObjectId;
    name?: string;
    user?: {
      _id: Types.ObjectId;
      email: string;
    };
  };
  players: Types.ObjectId[];
  date: Date;
}
