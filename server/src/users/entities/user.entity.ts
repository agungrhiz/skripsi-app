import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/roles/roles.enum';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  passwordHash?: string;

  @Field()
  emailVerified: boolean;

  @Field({ nullable: true })
  verificationToken?: string;

  @Field()
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
