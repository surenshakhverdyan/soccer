import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Position } from 'src/enums';

describe('dashboard/team/TeamController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create-team (POST)', () => {
    return request(app.getHttpServer())
      .post('/team/create-team')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlZTBmNDRjOWQ3MWRlMDc3OWY5MTEiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.wdMfHWZD4jLlsJ3jcwpugOoU2gByJN-IDBYQTnUsDhY',
      })
      .field('name', 'Soccer_1')
      .field('players[0][name]', 'Henrik Mkhitaryan')
      .field('players[0][number]', '10')
      .field('players[0][position]', Position.GK)
      .expect(201);
  });
});
