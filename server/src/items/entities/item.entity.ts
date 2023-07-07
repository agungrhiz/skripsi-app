import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Upload } from '@/uploads/entities/upload.entity'

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Int)
  fkPhotoId: number

  @Field(() => Int)
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => Upload)
  upload: Upload
}
