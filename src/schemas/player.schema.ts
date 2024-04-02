import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Player extends Document {}

export const PlayerSchema = SchemaFactory.createForClass(Player);
