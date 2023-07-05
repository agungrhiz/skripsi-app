import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from '@/auth/auth.service'
import { CredentialsAuthInput } from '@/auth/dto/credentials-auth.input'
import { LoginResponseDto } from '@/auth/dto/login-response.dto'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(GqlAuthGuard)
  async login(@Args('credentials') credentials: CredentialsAuthInput) {
    return this.authService.login(credentials)
  }
}
