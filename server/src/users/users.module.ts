import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { UsersResolver } from '@/users/users.resolver'
import { UsersService } from '@/users/users.service'

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
