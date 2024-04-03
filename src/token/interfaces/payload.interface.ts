import { Types } from 'mongoose';

export interface IPayload {
  sub: Types.ObjectId;
  role: string;
  type: string;
  iat?: Date;
  exp?: Date;
}
