import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateItemInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Int)
  fkPhotoId: number
}
