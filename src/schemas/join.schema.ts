import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Status } from 'src/enums';

@Schema({ timestamps: true })
export class Join extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.Pending,
  })
  status: string;
}

export const JoinSchema = SchemaFactory.createForClass(Join);
