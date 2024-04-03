import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Join extends Document {}

export const JoinSchema = SchemaFactory.createForClass(Join);
