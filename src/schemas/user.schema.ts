import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Role } from 'src/enums';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Role),
    required: true,
  })
  role: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
  })
  team: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
