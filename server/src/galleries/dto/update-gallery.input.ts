import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

import { CreateGalleryInput } from '@/galleries/dto/create-gallery.input'

@InputType()
export class UpdateGalleryInput extends PartialType(CreateGalleryInput) {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  id: number
}
