import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Schedule extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Game',
  })
  game: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  team: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Player',
      },
    ],
  })
  players: Types.ObjectId[];

  @Prop({ type: Date })
  date: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
