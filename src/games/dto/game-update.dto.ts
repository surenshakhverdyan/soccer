import { Types } from 'mongoose';

class Goals {
  assist?: Types.ObjectId;
  goal?: Types.ObjectId;
}

class Cards {
  player?: Types.ObjectId;
  yellow?: number;
  red?: number;
}

export class GameUpdateDto {
  gameId: Types.ObjectId;
  teamKey: string;
  goals?: Goals[];
  cards?: Cards[];
}
