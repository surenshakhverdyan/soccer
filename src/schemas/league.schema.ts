import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class League extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  place_1: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  place_2: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  place_3: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Basket',
      },
    ],
  })
  baskets: Types.ObjectId[];

  @Prop({
    type: [
      {
        team: {
          type: Types.ObjectId,
          ref: 'Team',
        },
        points: {
          type: Number,
          default: 0,
        },
        games: {
          type: Number,
          default: 0,
        },
        wins: {
          type: Number,
          default: 0,
        },
        losses: {
          type: Number,
          default: 0,
        },
        draws: {
          type: Number,
          default: 0,
        },
      },
    ],
  })
  teams: {
    team: Types.ObjectId;
    points: number;
    games: number;
    wins: number;
    losses: number;
    draws: number;
  }[];

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Game',
      },
    ],
  })
  games: Types.ObjectId[];

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.Active,
  })
  status: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
