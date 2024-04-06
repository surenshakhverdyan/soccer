import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('admin/player/PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('delete player (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/admin/delete-player')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        playerId: '660ee2af5e2e7fe94fe72cb5',
      })
      .expect(200);
  });
});
