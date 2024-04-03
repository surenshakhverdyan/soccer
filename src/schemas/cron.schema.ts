import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cron extends Document {
  @Prop({ type: Date })
  endTransfers: Date;
}

export const CronSchema = SchemaFactory.createForClass(Cron);
