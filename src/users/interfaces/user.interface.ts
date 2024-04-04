import { Types } from 'mongoose';

import { Team } from 'src/schemas';

export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: Types.ObjectId | Team;
  authToken: string;
  refreshToken: string;
}
