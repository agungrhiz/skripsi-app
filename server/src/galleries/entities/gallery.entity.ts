import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Upload } from '@/uploads/entities/upload.entity'

@ObjectType()
export class Gallery {
  @Field(() => Int)
  id: number

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean)
  isPublished: boolean

  @Field(() => Int)
  fkUploadId: number

  @Field(() => String)
  createdBy: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Upload)
  upload: Upload
}
