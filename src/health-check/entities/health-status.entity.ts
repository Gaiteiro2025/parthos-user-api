import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusEntity {
  @ApiProperty({ description: 'Status da API', example: 'API is running' })
  status: string;

  @ApiProperty({ description: 'Versão da API', example: '1.0.0' })
  version: string;

  @ApiProperty({
    description: 'Timestamp da última verificação',
    example: '2024-12-12T12:00:00.000Z',
  })
  timestamp: string;
}
