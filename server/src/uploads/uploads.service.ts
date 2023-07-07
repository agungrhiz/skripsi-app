import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { dirname, join, parse } from 'path'
import * as sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

import { PrismaService } from '@/prisma/prisma.service'
import { UploadType } from '@/uploads/enums/upload-type.enum'

@Injectable()
export class UploadsService {
  private readonly s3Client: S3Client

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    })
  }

  public async uploadFile(file: Express.Multer.File) {
    const url = join(uuidv4(), file.originalname)
    const uploadType = await this.getUploadType(file.mimetype)

    let thumbnailUrl: string | null = null
    if (uploadType === UploadType.IMAGE) {
      thumbnailUrl = await this.generateThumbnail(file.buffer, url)
    }
    await this.sendToS3(file.buffer, url)

    return this.prismaService.upload.create({
      data: {
        url,
        thumbnailUrl,
        type: uploadType,
        name: file.originalname,
        size: file.size,
      },
    })
  }

  private async getUploadType(mimetype: string): Promise<UploadType> {
    if (mimetype.startsWith('image')) {
      return UploadType.IMAGE
    } else if (mimetype.startsWith('video')) {
      return UploadType.VIDEO
    } else {
      return UploadType.OTHER
    }
  }

  private async sendToS3(buffer: Buffer, url: string): Promise<void> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
          Key: url,
          Body: buffer,
        })
      )
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error.message}`)
    }
  }

  private async generateThumbnail(
    buffer: Buffer,
    url: string
  ): Promise<string> {
    const thumbnailUrl = join(dirname(url), parse(url).name + '-thumbnail.jpg')
    const thumbnailBuffer = await sharp(buffer)
      .resize(200, 200)
      .jpeg({ quality: 80 })
      .toBuffer()

    await this.sendToS3(thumbnailBuffer, thumbnailUrl)

    return thumbnailUrl
  }
}
