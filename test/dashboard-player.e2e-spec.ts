import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Position } from 'src/enums';

describe('dashboard/player/PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('add player (PUT)', () => {
    return request(app.getHttpServer())
      .put('/team/add-player')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.Q0s-_pC6bmUw_wFU1mOYSMiX7cBXSw4OO4sdPTyOALk',
      })
      .send({
        name: 'Arthur',
        number: '22',
        position: Position.LM,
      })
      .expect(200);
  });

  it('update player (PUT)', () => {
    return request(app.getHttpServer())
      .put('/team/update-player')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.Q0s-_pC6bmUw_wFU1mOYSMiX7cBXSw4OO4sdPTyOALk',
      })
      .send({
        name: 'Karen',
        number: '15',
        position: Position.ST,
        playerId: '660f9f416307a97a35ced524',
      })
      .expect(200);
  });
});
