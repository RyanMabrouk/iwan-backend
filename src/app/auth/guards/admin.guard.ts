import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { TRANSACTION_PROVIDER } from '../../database/conf/constants';
import { ITransaction } from '../../database/types/transaction';
import { RolesEnum } from 'src/types/other/enums.types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException();
    }

    const res = await this.trx
      .selectFrom('users')
      .selectAll()
      .where('user_id', '=', user.id)
      .executeTakeFirst();
    const userRoles = res?.roles;

    if (!userRoles?.includes(RolesEnum.ADMIN)) {
      return false;
    }

    return true;
  }
}
