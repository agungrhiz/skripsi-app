import { Module } from '@nestjs/common'

import { MailModule } from '@/mail/mail.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { UsersResolver } from '@/users/users.resolver'
import { UsersService } from '@/users/users.service'

@Module({
  imports: [MailModule, PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
