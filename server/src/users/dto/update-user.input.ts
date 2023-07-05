import { Field, InputType, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

import { CreateUserInput } from '@/users/dto/create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string
}
