import { Injectable } from '@nestjs/common'

import { MailService } from '@/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateUserInput } from '@/users/dto/create-user.input'
import { UpdateUserInput } from '@/users/dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.prismaService.user.create({
      data: createUserInput,
    })

    await this.mailService.sendActivationAccount(
      user.email,
      user.username,
      user.verificationToken
    )

    return this.exclude(user, ['passwordHash'])
  }

  async findAll() {
    const user = await this.prismaService.user.findMany()
    const result = user.map((user) => this.exclude(user, ['passwordHash']))
    return result
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })
    const result = this.exclude(user, ['passwordHash'])
    return result
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  }

  async findByVerificationToken(verificationToken: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        verificationToken,
      },
    })
    return user
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserInput,
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    })
  }

  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<User, Key>
  }
}
