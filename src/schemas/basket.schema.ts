import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Basket extends Document {}

export const BasketSchema = SchemaFactory.createForClass(Basket);
