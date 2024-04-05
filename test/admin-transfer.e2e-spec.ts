import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Status } from 'src/enums';

describe('admin/transfer/TransferController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get pending transfers (GET)', () => {
    return request(app.getHttpServer())
      .get('/admin/pending-transfers')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .expect(200);
  });

  it('transfer (PUT)', () => {
    return request(app.getHttpServer())
      .put('/admin/transfer')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        transferId: '660febeb9f0098e6c040cb63',
        status: Status.Transferred,
      })
      .expect(200);
  });
});
