import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'

import { PrismaModule } from '@/prisma/prisma.module'
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
    PrismaModule,
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
