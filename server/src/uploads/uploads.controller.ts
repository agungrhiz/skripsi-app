import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UploadsService } from '@/uploads/uploads.service'

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadsService.uploadFile(file)
  }

  @Get()
  async readStream(@Query('url') url: string, @Res() res: any): Promise<void> {
    const readStream = await this.uploadsService.readStream(url)
    readStream.pipe(res)
  }
}
