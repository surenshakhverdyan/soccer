import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Schedule extends Document {}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
