import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

import { CreateItemInput } from '@/items/dto/create-item.input'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => Int)
  id: number
}
