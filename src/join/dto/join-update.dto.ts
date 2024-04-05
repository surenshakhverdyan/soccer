import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

import { Status } from 'src/enums';

export class JoinUpdateDto {
  @IsNotEmpty()
  joinId: Types.ObjectId;

  @IsEnum(Status)
  @IsOptional()
  status?: string;
}
