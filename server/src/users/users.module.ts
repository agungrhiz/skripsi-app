import { Module } from '@nestjs/common'

import { MailService } from '@/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UsersResolver } from '@/users/users.resolver'
import { UsersService } from '@/users/users.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaService, MailService],
})
export class UsersModule {}
