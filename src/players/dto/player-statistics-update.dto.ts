import { Types } from 'mongoose';

export class PlayerStatisticsUpdateDto {
  playerId: Types.ObjectId;
  fieldKey: string;
  value: number;
}
