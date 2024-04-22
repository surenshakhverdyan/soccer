import { Types } from 'mongoose';

export class PointsUpdateDto {
  leagueId: Types.ObjectId;

  teamId: Types.ObjectId;

  value: number;
}
