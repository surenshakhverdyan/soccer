import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AdminGuard } from 'src/guards';
import { JoinService } from './join.service';
import { Join } from 'src/schemas';
import { JoinsService } from 'src/joins/joins.service';
import { JoinUpdateDto } from './dto';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('admin')
export class JoinController {
  constructor(
    private readonly joinService: JoinService,
    private readonly joinsService: JoinsService,
  ) {}

  @Get('join')
  getAll(): Promise<Join[]> {
    return this.joinsService.getAll();
  }

  @Patch('update-join')
  updateJoin(@Body() dto: JoinUpdateDto): Promise<boolean> {
    return this.joinService.updateJoin(dto);
  }
}
