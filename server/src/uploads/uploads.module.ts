import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { PrismaService } from '@/prisma/prisma.service'
import { UploadsController } from '@/uploads/uploads.controller'
import { UploadsService } from '@/uploads/uploads.service'

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('UPLOAD_RATE_TTL'),
        limit: configService.get('UPLOAD_RATE_LIMIT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadsController],
  providers: [
    UploadsService,
    PrismaService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class UploadsModule {}
