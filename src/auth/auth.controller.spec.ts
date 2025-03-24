import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ access_token: 'jwt_token_example' }),
    register: jest.fn().mockResolvedValue({}),
  };

  const mockUsersService = {
    findByEmail: jest
      .fn()
      .mockResolvedValue({ email: 'test@test.com', username: 'testuser' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      const loginDto: LoginDto = { email: 'test@test.com', password: '123456' };

      const result = await authController.login(loginDto);
      expect(result).toEqual({ access_token: 'jwt_token_example' });
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });

    it('should throw an error if credentials are invalid', async () => {
      const loginDto: LoginDto = {
        email: 'invalid@test.com',
        password: 'wrongpass',
      };
      mockAuthService.login.mockRejectedValueOnce(
        new Error('Invalid credentials'),
      );

      try {
        await authController.login(loginDto);
      } catch (error: any) {
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        email: 'newuser@test.com',
        password: 'newpass',
        name: 'teste',
      };

      const result = await authController.register(registerDto);
      expect(result).toEqual({});
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should throw an error for invalid registration data', async () => {
      const registerDto: RegisterDto = {
        email: 'invalid',
        password: 'short',
        name: '',
      };
      mockAuthService.register.mockRejectedValueOnce(
        new Error('Invalid registration data'),
      );

      try {
        await authController.register(registerDto);
      } catch (error: any) {
        expect(error.message).toBe('Invalid registration data');
      }
    });
  });
});
