import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Player',
      },
    ],
    validate: [
      {
        validator: (value: Types.ObjectId[]) => {
          return value.length <= 21;
        },
        message: 'The count of players must not exceed 21',
      },
    ],
  })
  players: Types.ObjectId[];

  @Prop({ type: String })
  avatar: string;

  @Prop({
    type: Number,
    default: 0,
  })
  wins: number;

  @Prop({
    type: Number,
    default: 0,
  })
  draws: number;

  @Prop({
    type: Number,
    default: 0,
  })
  losses: number;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.Inactive,
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
