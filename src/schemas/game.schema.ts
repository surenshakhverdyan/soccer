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
      technicalDefeat: { type: Boolean, default: false },
    },
  })
  team_1: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
    goals: Array<{ assist: Types.ObjectId; goal: Types.ObjectId }>;
    cards: Array<{ player: Types.ObjectId; yellow: number; red: number }>;
    technicalDefeat: boolean;
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
      technicalDefeat: { type: Boolean, default: false },
    },
  })
  team_2: {
    team: Types.ObjectId;
    players: Types.ObjectId[];
    goals: Array<{ assist: Types.ObjectId; goal: Types.ObjectId }>;
    cards: Array<{ player: Types.ObjectId; yellow: number; red: number }>;
    technicalDefeat: boolean;
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
    default: Status.Pending,
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Basket',
  })
  basket: Types.ObjectId;
}

export const GameSchema = SchemaFactory.createForClass(Game);
