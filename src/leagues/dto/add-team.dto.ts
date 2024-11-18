import { Types } from 'mongoose';

export class AddTeamDto {
  leagueId: Types.ObjectId;

  teamId: Types.ObjectId;
}
