import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Basket extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'League',
  })
  league: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Team',
      },
    ],
  })
  teams: Types.ObjectId[];
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
