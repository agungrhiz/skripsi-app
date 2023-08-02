import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsNumber } from 'class-validator'

@InputType()
export class CreateGalleryInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @IsBoolean()
  @Field()
  isPublished: boolean

  @IsNumber()
  @Field(() => Int)
  fkUploadId: number
}
