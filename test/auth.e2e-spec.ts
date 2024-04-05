import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('sign in (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: 'admin@email.com',
        password: '156354111',
      })
      .expect(200);
  });

  it('refresh token (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/refresh-token')
      .set({
        'refresh-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYWNjYTM3ZGQ1YzBiZDg2OWFiNDYiLCJyb2xlIjoiYWRtaW4iLCJ0eXBlIjoiUlQifQ.HAbrO8ShNoa1hYkQVOgj19PdLPRRVgpYQOBIKwqcEec',
      })
      .expect(200);
  });

  it('forgot password (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/forgot-password')
      .send({
        email: 'admin@email.com',
      })
      .expect(200);
  });

  it('password reset (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(
        '/auth/password-reset/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJGUFQifQ.h7Ts3Qp-v0MKwiLRHDWvHHipWYY0AJVm8eZxu94Ppj0',
      )
      .send({
        password: '156354111',
        passwordConfirm: '156354111',
      })
      .expect(200);
  });
});
