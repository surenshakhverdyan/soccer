import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('admin/profile/ProfileController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('update profile (PUT)', () => {
    return request(app.getHttpServer())
      .put('/admin/update-profile')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        name: 'Admin',
        email: 'admin@email.com',
        phone: '+37411000000',
      })
      .expect(200);
  });

  it('password update (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/admin/password-update')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkNDM1ZWEzNjhiYzMxZDdlN2ZlYWMiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiQVQifQ.Id7efVUe3F-WtxLYb8hvqpZBqgXVoxHsi5mnRirrBP8',
      })
      .send({
        currentPassword: '156354111',
        password: '156354111',
        passwordConfirm: '156354111',
      })
      .expect(200);
  });
});
