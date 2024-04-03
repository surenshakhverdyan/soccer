import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cron extends Document {}

export const CronSchema = SchemaFactory.createForClass(Cron);
