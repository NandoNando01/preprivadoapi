import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity.js';
import { LoginDto } from './login.dto.js';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const existing = await this.userRepository.findOneBy({
      email: 'admin@test.com',
    });
    if (existing) return;

    const hash = await bcrypt.hash('Admin123', 10);
    await this.userRepository.save(
      this.userRepository.create({
        email: 'admin@test.com',
        password: hash,
        nombre: 'Admin',
      }),
    );
    this.logger.log('Usuario admin@test.com creado');
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) return null;

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) return null;

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}