import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

import { CreateItemInput } from '@/items/dto/create-item.input'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  id: number
}
