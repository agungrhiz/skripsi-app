import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { Roles } from '@/roles/roles.decorator'
import { Role } from '@/roles/roles.enum'
import { RolesGuard } from '@/roles/roles.guard'
import { CreateUserInput } from '@/users/dto/create-user.input'
import { UpdateUserInput } from '@/users/dto/update-user.input'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'

@Resolver(() => User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @Roles(Role.ADMINISTRATOR)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  @Roles(Role.ADMINISTRATOR)
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  @Roles(Role.ADMINISTRATOR)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User)
  @Roles(Role.ADMINISTRATOR)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  @Roles(Role.ADMINISTRATOR)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id)
  }
}
