import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Player',
      },
    ],
    validate: [
      {
        validator: (value: any[]) => {
          return value.length <= 21;
        },
        message: 'The count of players must not exceed 21',
      },
    ],
  })
  players: Types.ObjectId[];

  @Prop({ type: String })
  avatar: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
