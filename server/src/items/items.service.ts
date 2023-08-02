import { Injectable } from '@nestjs/common'

import { CreateItemInput } from '@/items/dto/create-item.input'
import { UpdateItemInput } from '@/items/dto/update-item.input'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  create(createItemInput: CreateItemInput) {
    return this.prismaService.item.create({
      data: createItemInput,
      include: { upload: true },
    })
  }

  findAll() {
    return this.prismaService.item.findMany({ include: { upload: true } })
  }

  findPublished() {
    return this.prismaService.item.findMany({
      where: { isPublished: true },
      include: { upload: true },
    })
  }

  findOne(id: number) {
    return this.prismaService.item.findUnique({
      where: { id },
      include: { upload: true },
    })
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return this.prismaService.item.update({
      where: { id },
      data: updateItemInput,
      include: { upload: true },
    })
  }

  remove(id: number) {
    return this.prismaService.item.delete({
      where: { id },
      include: { upload: true },
    })
  }
}
