import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('admin/join/JoinController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('join (GET)', () => {
    return request(app.getHttpServer())
      .get('/admin/join')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .expect(200);
  });

  it('update join (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/admin/update-join')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        joinId: '660ff7f817aaf974c04573cc',
        status: true,
      })
      .expect(200);
  });
});
