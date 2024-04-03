import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class Transfer extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Player',
  })
  player: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  fromTeam: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  toTeam: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.Pending,
  })
  status: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
