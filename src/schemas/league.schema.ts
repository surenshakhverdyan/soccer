import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class League extends Document {}

export const LeagueSchema = SchemaFactory.createForClass(League);
