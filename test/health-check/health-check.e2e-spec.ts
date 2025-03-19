import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthStatusEntity } from '../../src/health-check/entities/health-status.entity';
import { HealthCheckController } from '../../src/health-check/health-check.controller';
import { HealthCheckService } from '../../src/health-check/health-check.service';

describe('HealthCheckController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health-check (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/health-check')
      .expect(200);

    expect(response.body).toEqual<HealthStatusEntity>({
      status: 'API is running',
      version: expect.any(String),
      timestamp: expect.any(String),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
