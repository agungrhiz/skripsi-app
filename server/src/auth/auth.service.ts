import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { CredentialsAuthInput } from '@/auth/dto/credentials-auth.input'
import { LoginResponseDto } from '@/auth/dto/login-response.dto'
import { ResetPasswordInput } from '@/auth/dto/reset-password.input'
import { JwtPayload } from '@/auth/entities/jwt-payload.entity'
import { MailService } from '@/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UsersService } from '@/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UsersService,
    private configService: ConfigService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      delete user.passwordHash
      return user
    }

    return null
  }

  async login(credentials: CredentialsAuthInput): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      credentials.email,
      credentials.password
    )
    const accessToken = await this.generateToken(user)
    const payload: JwtPayload = this.jwtService.verify(accessToken, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    })

    return { accessToken, payload }
  }

  private async generateToken(user: User): Promise<string> {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '24h',
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      }
    )

    return accessToken
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('Email belum terdaftar')
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken: uuidv4(),
      },
    })

    await this.mailService.sendResetPassword(
      user.email,
      user.username,
      updateUser.verificationToken
    )

    delete user.passwordHash
    return user
  }

  async resetPassword(ResetPasswordInput: ResetPasswordInput) {
    const { token, password, passwordConfirmation } = ResetPasswordInput
    const user = await this.userService.findByVerificationToken(token)
    if (!user) {
      throw new NotFoundException('Gagal mengubah password')
    }

    if (password !== passwordConfirmation) {
      throw new Error('Kata sandi tidak sama')
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: await bcrypt.hash(password, 10),
        emailVerified: true,
        verificationToken: null,
      },
    })

    delete user.passwordHash
    return user
  }
}
