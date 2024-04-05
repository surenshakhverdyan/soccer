import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('dashboard/transfer/TransferController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create transfer (POST)', () => {
    return request(app.getHttpServer())
      .post('/transfer/create-transfer')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.Q0s-_pC6bmUw_wFU1mOYSMiX7cBXSw4OO4sdPTyOALk',
      })
      .send({
        playerId: '660f9f416307a97a35ced524',
      })
      .expect(201);
  });
});
