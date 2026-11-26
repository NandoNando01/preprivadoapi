import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { LoginDto } from './login.dto.js';
import { LoginDtoSchema } from './login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body({ schema: LoginDtoSchema }) dto: LoginDto) {
    const result = await this.authService.login(dto);
    if (!result) throw new UnauthorizedException('Credenciales inválidas');
    return result;
  }
}