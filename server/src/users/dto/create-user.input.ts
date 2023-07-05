import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { Role } from '@/roles/roles.enum'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @IsEnum(Role)
  @Field()
  role: Role
}
