import { Injectable } from '@nestjs/common'

import { CreateGalleryInput } from '@/galleries/dto/create-gallery.input'
import { UpdateGalleryInput } from '@/galleries/dto/update-gallery.input'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class GalleriesService {
  constructor(private prismaService: PrismaService) {}

  create(createGalleryInput: CreateGalleryInput) {
    return this.prismaService.gallery.create({
      data: createGalleryInput,
      include: { upload: true },
    })
  }

  findAll() {
    return this.prismaService.gallery.findMany({ include: { upload: true } })
  }

  findPublished() {
    return this.prismaService.gallery.findMany({
      where: { isPublished: true },
      include: { upload: true },
    })
  }

  findOne(id: number) {
    return this.prismaService.gallery.findUnique({
      where: { id },
      include: { upload: true },
    })
  }

  update(id: number, updateGalleryInput: UpdateGalleryInput) {
    return this.prismaService.gallery.update({
      where: { id },
      data: updateGalleryInput,
      include: { upload: true },
    })
  }

  remove(id: number) {
    return this.prismaService.gallery.delete({
      where: { id },
      include: { upload: true },
    })
  }
}
