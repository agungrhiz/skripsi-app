import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthResolver } from '@/auth/auth.resolver'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { PrismaService } from '@/prisma/prisma.service'
import { RolesGuard } from '@/roles/roles.guard'

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
