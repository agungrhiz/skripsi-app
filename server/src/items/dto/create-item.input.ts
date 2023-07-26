import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string

  @IsBoolean()
  @IsNotEmpty()
  @Field()
  isPublished: boolean

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  fkPhotoId: number
}
