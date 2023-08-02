import { Module } from '@nestjs/common'

import { GalleriesResolver } from '@/galleries/galleries.resolver'
import { GalleriesService } from '@/galleries/galleries.service'
import { PrismaModule } from '@/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [GalleriesResolver, GalleriesService],
})
export class GalleriesModule {}
