import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Upload } from '@/uploads/entities/upload.entity'

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Boolean)
  isPublished: boolean

  @Field(() => Int)
  fkPhotoId: number

  @Field(() => String)
  createdBy: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Upload)
  upload: Upload
}
