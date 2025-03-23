import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    // Set up the mock implementation of bcrypt.compare
    (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Simulating password comparison as successful
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password'); // Simulating password hashing
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException if email is already in use', async () => {
      mockUsersService.findByEmail.mockResolvedValue({} as any);

      const registerDto = { name: 'Test', email: 'test@test.com', password: 'password' };

      await expect(authService.register(registerDto)).rejects.toThrowError(
        new ConflictException('Email já está em uso.')
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should return a JWT token when registration is successful', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null); // Simulando que o e-mail não existe
      mockUsersService.create.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        name: 'Test',
        password: 'hashed_password',
      });

      const registerDto = { name: 'Test', email: 'test@test.com', password: 'password' };

      mockJwtService.sign.mockReturnValue('jwt_token_example');

      const result = await authService.register(registerDto);

      expect(result).toEqual({
        access_token: 'jwt_token_example',
        user: { id: '1', email: 'test@test.com', name: 'Test', password: 'hashed_password' },
      });
      expect(mockUsersService.create).toHaveBeenCalledWith({
        name: 'Test',
        email: 'test@test.com',
        password: 'hashed_password', // Verificando se a senha foi passada corretamente
      });
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should throw ConflictException if credentials are invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null); // Simulando usuário não encontrado

      const loginDto = { email: 'test@test.com', password: 'wrongpassword' };

      await expect(authService.login(loginDto.email, loginDto.password)).rejects.toThrowError(
        new ConflictException('Credenciais inválidas.')
      );
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should return a JWT token when login is successful', async () => {
      const mockUser = { id: '1', email: 'test@test.com', password: 'hashed_password' };
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      const loginDto = { email: 'test@test.com', password: 'password' };

      mockJwtService.sign.mockReturnValue('jwt_token_example');

      const result = await authService.login(loginDto.email, loginDto.password);

      expect(result).toEqual({ access_token: 'jwt_token_example' });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith('test@test.com');
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, 'hashed_password');
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });

  describe('validateCredentials', () => {
    it('should return null if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await authService.validateCredentials('nonexistent@test.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ id: '1', email: 'test@test.com', password: 'hashed_password' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Simulando senha incorreta

      const result = await authService.validateCredentials('test@test.com', 'wrongpassword');
      expect(result).toBeNull();
    });

    it('should return user data if credentials are valid', async () => {
      const mockUser = { id: '1', email: 'test@test.com', password: 'hashed_password' };
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateCredentials('test@test.com', 'password');
      expect(result).toEqual({ id: '1', email: 'test@test.com' });
    });
  });
});
