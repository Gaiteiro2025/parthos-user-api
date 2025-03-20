import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { LocalAuthGuard } from '../../src/auth/guards/local-auth.guard';

describe('AuthController', () => {
    let controller: AuthController;

    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn(),
    };

    const mockLocalAuthGuard = { canActivate: jest.fn(() => true) };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
                {
                    provide: LocalAuthGuard,
                    useValue: mockLocalAuthGuard,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('POST /auth/login', () => {
        it('should return an access token on successful login', async () => {
            const loginDto = { email: 'test@test.com', password: 'password123' };
            const result = { access_token: 'jwt_token_example' };
            mockAuthService.login.mockResolvedValue(result);

            const response = await controller.login(loginDto);

            expect(response).toEqual(result);
            expect(mockAuthService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
        });

        it('should throw ConflictException on invalid credentials', async () => {
            const loginDto = { email: 'invalid@test.com', password: 'wrongpassword' };
            mockAuthService.login.mockRejectedValue(new ConflictException('Credenciais inválidas.'));

            await expect(controller.login(loginDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('POST /auth/register', () => {
        it('should return an access token and user data on successful registration', async () => {
            const registerDto = { name: 'Test User', email: 'test@test.com', password: 'password123' };
            const result = { access_token: 'jwt_token_example', user: registerDto };
            mockAuthService.register.mockResolvedValue(result);

            const response = await controller.register(registerDto);

            expect(response).toEqual(result);
            expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
        });

        it('should throw ConflictException if email is already in use', async () => {
            const registerDto = { name: 'Test User', email: 'test@test.com', password: 'password123' };
            mockAuthService.register.mockRejectedValue(new ConflictException('Email já está em uso.'));

            await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
        });
    });
});
