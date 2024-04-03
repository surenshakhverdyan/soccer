import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class Game extends Document {
  @Prop({ type: Date })
  startDateTime: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'League',
  })
  league: Types.ObjectId;

  @Prop({
    type: {
      team: { type: Types.ObjectId, ref: 'Team' },
      players: [{ type: Types.ObjectId, ref: 'Player' }],
      goals: [
        {
          assist: { type: Types.ObjectId, ref: 'Player' },
          goal: { type: Types.ObjectId, ref: 'Player' },
        },
      ],
      cards: [
        {
          player: { type: Types.ObjectId, ref: 'Player' },
          yellow: { type: Number },
          red: { type: Number },
        },
      ],
    },
  })
  team1: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
    goals: Array<{ assist: Types.ObjectId; goal: Types.ObjectId }>;
    cards: Array<{ player: Types.ObjectId; yellow: number; red: number }>;
  };

  @Prop({
    type: {
      team: { type: Types.ObjectId, ref: 'Team' },
      players: [{ type: Types.ObjectId, ref: 'Player' }],
      goals: [
        {
          assist: { type: Types.ObjectId, ref: 'Player' },
          goal: { type: Types.ObjectId, ref: 'Player' },
        },
      ],
      cards: [
        {
          player: { type: Types.ObjectId, ref: 'Player' },
          yellow: { type: Number },
          red: { type: Number },
        },
      ],
    },
  })
  team2: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
    goals: Array<{ assist: Types.ObjectId; goal: Types.ObjectId }>;
    cards: Array<{ player: Types.ObjectId; yellow: number; red: number }>;
  };

  @Prop({
    type: String,
  })
  video: string;

  @Prop({
    type: [{ type: String }],
  })
  images: string[];

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status, // set value
  })
  status: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
