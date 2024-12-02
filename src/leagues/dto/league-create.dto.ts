import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LeagueCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      '[{ "team": "ObjectId" }, { "team": "ObjectId" }, { "team": "ObjectId" }]',
  })
  @IsArray()
  @ArrayMinSize(2)
  teams: { team: Types.ObjectId }[];
}
