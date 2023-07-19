import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from '@/auth/auth.service'
import { CredentialsAuthInput } from '@/auth/dto/credentials-auth.input'
import { LoginResponseDto } from '@/auth/dto/login-response.dto'
import { ResetPasswordInput } from '@/auth/dto/reset-password.input'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { User } from '@/users/entities/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(GqlAuthGuard)
  async login(@Args('credentials') credentials: CredentialsAuthInput) {
    return this.authService.login(credentials)
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  currentUser(@Context('req') req: any) {
    return this.authService.me(req.user)
  }

  @Mutation(() => User)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email)
  }

  @Mutation(() => User)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  ) {
    return this.authService.resetPassword(resetPasswordInput)
  }
}
