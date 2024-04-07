import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('admin/league/LeagueController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create league (POST)', () => {
    return request(app.getHttpServer())
      .post('/admin/create-league')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        name: 'League_2',
        teams: [
          { team: '661218f59646cacbdf8488bd' },
          { team: '661218f59646cacbdf8488bd' },
        ],
      })
      .expect(201);
  });
});
