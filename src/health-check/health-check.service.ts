import { Injectable } from '@nestjs/common';
import { HealthStatusEntity } from './entities/health-status.entity';
import * as packageJson from '../../package.json';

@Injectable()
export class HealthCheckService {
  getHealthStatus(): HealthStatusEntity {
    return {
      status: 'API is running',
      version: packageJson.version,
      timestamp: new Date().toISOString(),
    };
  }
}
