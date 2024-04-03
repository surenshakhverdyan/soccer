import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { Position, Status } from 'src/enums';

@Schema({ timestamps: true })
export class Player extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    enum: Object.values(Position),
    required: true,
  })
  position: string;

  @Prop({
    type: Number,
    required: true,
    validate: {
      validator: async function (number: number) {
        const existingPlayer = await (
          this.constructor as Model<Player>
        ).findOne({
          team: this.team,
          number: number,
        });
        return !existingPlayer;
      },
      message: 'Player number must be unique in the team',
    },
  })
  number: number;

  @Prop({ type: Number })
  penalties: number;

  @Prop({ type: Number })
  goals: number;

  @Prop({ type: Number })
  yellowCards: number;

  @Prop({ type: Number })
  redCards: number;

  @Prop({ type: Number })
  assists: number;

  @Prop({ type: String })
  avatar: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status, // set value
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Team',
    required: true,
  })
  team: Types.ObjectId;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
