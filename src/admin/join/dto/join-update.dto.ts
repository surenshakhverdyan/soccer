import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class JoinUpdateDto {
  @IsNotEmpty()
  joinId: Types.ObjectId;

  @IsBoolean()
  status: boolean;
}
