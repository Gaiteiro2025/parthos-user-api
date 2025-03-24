import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    schema: {
      example: {
        access_token: 'jwt_token_example',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas.',
  })
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
    user: User;
  }> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos no registro.',
  })
  async register(@Body() registerDto: RegisterDto): Promise<{
    access_token: string;
    user: User;
  }> {
    return this.authService.register(registerDto);
  }
}
