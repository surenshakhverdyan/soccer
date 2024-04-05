import { Body, Controller, Post } from '@nestjs/common';

import { JoinCreateDto } from 'src/joins/dto';
import { JoinsService } from 'src/joins/joins.service';
import { Join } from 'src/schemas';

@Controller('join')
export class JoinController {
  constructor(private readonly joinsService: JoinsService) {}

  @Post()
  joinCreate(@Body() dto: JoinCreateDto): Promise<Join> {
    return this.joinsService.create(dto);
  }
}
