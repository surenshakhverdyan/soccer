import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transfer extends Document {}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
