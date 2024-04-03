import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Game extends Document {}

export const GameSchema = SchemaFactory.createForClass(Game);
