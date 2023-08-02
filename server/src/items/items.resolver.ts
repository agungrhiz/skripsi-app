import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CreateItemInput } from '@/items/dto/create-item.input'
import { UpdateItemInput } from '@/items/dto/update-item.input'
import { Item } from '@/items/entities/item.entity'
import { ItemsService } from '@/items/items.service'

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  @UseGuards(JwtAuthGuard)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput)
  }

  @Query(() => [Item], { name: 'items' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.itemsService.findAll()
  }

  @Query(() => [Item], { name: 'itemsPublished' })
  findPublished() {
    return this.itemsService.findPublished()
  }

  @Query(() => Item, { name: 'item' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id)
  }

  @Mutation(() => Item)
  @UseGuards(JwtAuthGuard)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput)
  }

  @Mutation(() => Item)
  @UseGuards(JwtAuthGuard)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id)
  }
}
