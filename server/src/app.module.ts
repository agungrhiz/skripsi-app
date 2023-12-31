import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { AuthModule } from '@/auth/auth.module'
import { GalleriesModule } from '@/galleries/galleries.module'
import { ItemsModule } from '@/items/items.module'
import { MailModule } from '@/mail/mail.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { UploadsModule } from '@/uploads/uploads.module'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    MailModule,
    UploadsModule,
    ItemsModule,
    GalleriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
