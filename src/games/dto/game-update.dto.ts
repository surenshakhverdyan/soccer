import { Types } from 'mongoose';

export class GameUpdateDto {
  gameId: Types.ObjectId;

  team_1: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
  };

  team_2: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
  };

  startDateTime: Date;
}
