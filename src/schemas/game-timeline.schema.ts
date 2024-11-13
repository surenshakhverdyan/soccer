import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Timeline extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Game',
    required: true,
  })
  gameId: Types.ObjectId;

  @Prop({
    type: [{ type: Date }],
  })
  dates: Date[];
}

export const timeLineSchema = SchemaFactory.createForClass(Timeline);
