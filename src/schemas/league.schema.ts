import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class League extends Document {
  @Prop({
    type: String,
    required: true,
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
        post: { type: Number },
      },
    ],
  })
  teams: { team: Types.ObjectId; points: number }[];

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
    default: Status, // set value
  })
  status: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
