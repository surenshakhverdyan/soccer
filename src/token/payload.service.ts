import { Injectable } from '@nestjs/common';

import { TokenType } from 'src/enums';
import { User } from 'src/schemas';
import { IPayload } from './interfaces';

@Injectable()
export class PayloadService {
  generatePayload(user: User, type: TokenType): IPayload {
    const payload = {
      sub: user._id,
      role: user.role,
      type,
    };

    return payload;
  }
}
