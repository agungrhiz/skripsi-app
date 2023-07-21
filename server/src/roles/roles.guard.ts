import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

import { JwtPayload } from '@/auth/entities/jwt-payload.entity'
import { ROLES_KEY } from '@/roles/roles.decorator'
import { Role } from '@/roles/roles.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user
    return this.validate(user, requiredRoles)
  }

  async validate(user: JwtPayload, requiredRoles: Role[]): Promise<boolean> {
    const hashRequiredRoles = requiredRoles.some((role) =>
      user.role?.includes(role)
    )
    if (!hashRequiredRoles) {
      throw new ForbiddenException('Forbidden to access this resource')
    }
    return true
  }
}
