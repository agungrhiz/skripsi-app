import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthResolver } from '@/auth/auth.resolver'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { MailModule } from '@/mail/mail.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { RolesGuard } from '@/roles/roles.guard'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [UsersModule, PrismaModule, MailModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
