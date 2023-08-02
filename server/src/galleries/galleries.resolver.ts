import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CreateGalleryInput } from '@/galleries/dto/create-gallery.input'
import { UpdateGalleryInput } from '@/galleries/dto/update-gallery.input'
import { Gallery } from '@/galleries/entities/gallery.entity'
import { GalleriesService } from '@/galleries/galleries.service'

@Resolver(() => Gallery)
export class GalleriesResolver {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Mutation(() => Gallery)
  @UseGuards(JwtAuthGuard)
  createGallery(
    @Args('createGalleryInput') createGalleryInput: CreateGalleryInput
  ) {
    return this.galleriesService.create(createGalleryInput)
  }

  @Query(() => [Gallery], { name: 'galleries' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.galleriesService.findAll()
  }

  @Query(() => [Gallery], { name: 'galleriesPublished' })
  findPublished() {
    return this.galleriesService.findPublished()
  }

  @Query(() => Gallery, { name: 'gallery' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.galleriesService.findOne(id)
  }

  @Mutation(() => Gallery)
  @UseGuards(JwtAuthGuard)
  updateGallery(
    @Args('updateGalleryInput') updateGalleryInput: UpdateGalleryInput
  ) {
    return this.galleriesService.update(
      updateGalleryInput.id,
      updateGalleryInput
    )
  }

  @Mutation(() => Gallery)
  @UseGuards(JwtAuthGuard)
  removeGallery(@Args('id', { type: () => Int }) id: number) {
    return this.galleriesService.remove(id)
  }
}
