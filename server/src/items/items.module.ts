import { Module } from '@nestjs/common'

import { ItemsResolver } from '@/items/items.resolver'
import { ItemsService } from '@/items/items.service'
import { PrismaModule } from '@/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
