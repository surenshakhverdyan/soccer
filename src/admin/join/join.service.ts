import { Injectable } from '@nestjs/common';
import { Status } from 'src/enums';

import { JoinUpdateDto } from './dto';
import { JoinsService } from 'src/joins/joins.service';

@Injectable()
export class JoinService {
  constructor(private readonly joinsService: JoinsService) {}

  async updateJoin(dto: JoinUpdateDto): Promise<boolean> {
    const payload = {
      joinId: dto.joinId,
      status: '',
    };

    if (dto.status === true) payload.status = Status.Accepted;
    else payload.status = Status.Declined;
    await this.joinsService.update(payload);
    return true;
  }
}
