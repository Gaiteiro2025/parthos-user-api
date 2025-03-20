import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ description: 'Nome do usuário' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Email do usuário', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;
}