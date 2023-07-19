import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { CredentialsAuthInput } from '@/auth/dto/credentials-auth.input'
import { ResetPasswordInput } from '@/auth/dto/reset-password.input'
import { JwtPayload } from '@/auth/types/jwt-payload.type'
import { MailService } from '@/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private configService: ConfigService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (user && isValid) {
      delete user.passwordHash
      return user
    }

    return null
  }

  async login(credentials: CredentialsAuthInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: credentials.email,
      },
    })
    delete user.passwordHash

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: [user.role],
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      }
    )

    return { accessToken, user }
  }

  async me(payload: JwtPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    })
    delete user.passwordHash

    return user
  }

  async forgotPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new NotFoundException('Email tidak ditemukan')
    }

    await this.prismaService.user.update({
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
      user.verificationToken
    )

    delete user.passwordHash
    return user
  }

  async resetPassword(ResetPasswordInput: ResetPasswordInput) {
    const { token, password, passwordConfirmation } = ResetPasswordInput

    if (password !== passwordConfirmation) {
      throw new Error('Password does not match')
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        verificationToken: token,
      },
    })
    delete user.passwordHash

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

    return user
  }
}
