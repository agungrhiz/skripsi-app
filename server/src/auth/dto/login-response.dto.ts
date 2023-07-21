import { Field, ObjectType } from '@nestjs/graphql'

import { JwtPayload } from '@/auth/entities/jwt-payload.entity'

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string

  @Field(() => JwtPayload)
  payload: JwtPayload
}
