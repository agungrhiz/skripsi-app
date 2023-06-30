import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CredentialsAuthInput } from './dto/credentials-auth.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (user && isValid) {
      return user;
    }

    return null;
  }

  async login(credentials: CredentialsAuthInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: credentials.email,
      },
    });
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      },
    );

    return { accessToken, user };
  }
}
