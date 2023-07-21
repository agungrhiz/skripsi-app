import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class JwtPayload {
  @Field()
  sub: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  role: string

  @Field()
  iat: number

  @Field()
  exp: number
}
