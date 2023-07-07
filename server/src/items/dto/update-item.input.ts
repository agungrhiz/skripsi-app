import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

import { CreateItemInput } from '@/items/dto/create-item.input'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => Int)
  id: number
}
