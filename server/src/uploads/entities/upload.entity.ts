import { Field, Int, ObjectType } from '@nestjs/graphql'

import { UploadType } from '@/uploads//enums/upload-type.enum'

@ObjectType()
export class Upload {
  @Field(() => Int)
  id: number

  @Field()
  url: string

  @Field()
  thumbnailUrl: string

  @Field()
  name: string

  @Field(() => Int)
  size: number

  @Field()
  type: UploadType

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
