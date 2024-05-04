import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

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

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.Active,
  })
  status: string;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
