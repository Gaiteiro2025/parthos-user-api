import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  private generateJwtToken(user: any) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      access_token: this.generateJwtToken(user),
      user,
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    user: User;
  }> {
    const user = await this.validateCredentials(email, password);
    if (!user) {
      throw new ConflictException('Credenciais inválidas.');
    }

    return {
      access_token: this.generateJwtToken(user),
      user,
    };
  }
}
