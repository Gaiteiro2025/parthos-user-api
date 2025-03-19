import { TestingModule, Test } from '@nestjs/testing';
import { HealthCheckModule } from './health-check.module';

describe('HealthCheckModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
