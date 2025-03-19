import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should return ', () => {
    it('should return "API is running!"', () => {
      expect(controller.getHealthStatus().status).toBe(
        service.getHealthStatus().status,
      );
    });
  });
});
