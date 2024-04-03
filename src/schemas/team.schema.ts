import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Team extends Document {}

export const TeamSchema = SchemaFactory.createForClass(Team);
