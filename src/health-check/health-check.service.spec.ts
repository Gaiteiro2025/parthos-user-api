import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from './health-check.service';
import { HealthStatusEntity } from './entities/health-status.entity';
import * as packageJson from '../../package.json';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckService],
    }).compile();

    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHealthStatus', () => {
    it('should return the correct health status', () => {
      const result: HealthStatusEntity = {
        status: 'API is running',
        version: packageJson.version,
        timestamp: expect.any(String),
      };

      expect(service.getHealthStatus()).toEqual(result);
    });

    it('should return a valid timestamp in ISO format', () => {
      const healthStatus = service.getHealthStatus();
      const timestamp = healthStatus.timestamp;

      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it('should return the correct version from package.json', () => {
      const healthStatus = service.getHealthStatus();
      expect(healthStatus.version).toBe(packageJson.version);
    });
  });
});
