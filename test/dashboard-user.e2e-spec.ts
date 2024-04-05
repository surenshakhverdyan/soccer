import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('dashboard/user/UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('update profile (POST)', () => {
    return request(app.getHttpServer())
      .put('/user/update-profile')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.Q0s-_pC6bmUw_wFU1mOYSMiX7cBXSw4OO4sdPTyOALk',
      })
      .send({
        name: 'user_2',
        email: 'user_2@email.com',
        phone: '+37411222223',
      })
      .expect(200);
  });

  it('password update (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/user/password-update')
      .set({
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlNGY2Y2Q3OWRmYzJhZTc2N2U0OWIiLCJyb2xlIjoidXNlciIsInR5cGUiOiJBVCJ9.Q0s-_pC6bmUw_wFU1mOYSMiX7cBXSw4OO4sdPTyOALk',
      })
      .send({
        currentPassword: '156354111',
        password: '156354111',
        passwordConfirm: '156354111',
      })
      .expect(200);
  });
});
