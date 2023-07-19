import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  private readonly frontendUrl: string

  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {
    this.frontendUrl = this.configService.get('FRONTEND_URL')
  }

  async sendActivationAccount(
    email: string,
    username: string,
    verificationToken: string
  ) {
    const url = `${this.frontendUrl}/activate-account/${verificationToken}`
    await this.mailerService.sendMail({
      to: email,
      subject: 'Activate your account',
      template: 'activation-account',
      context: {
        username,
        url,
      },
    })
  }

  async sendResetPassword(email: string, username: string, token: string) {
    const url = `${this.frontendUrl}/reset-password/${token}`
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        username,
        url,
      },
    })
  }
}
