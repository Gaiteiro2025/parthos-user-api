import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HealthStatusEntity } from './entities/health-status.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a API está funcionando' })
  @ApiResponse({
    status: 200,
    description: 'API está rodando',
    type: HealthStatusEntity,
  })
  getHealthStatus(): HealthStatusEntity {
    return this.healthCheckService.getHealthStatus();
  }
}
