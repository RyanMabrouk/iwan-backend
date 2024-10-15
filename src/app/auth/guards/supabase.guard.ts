import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { IS_PUBLIC_KEY } from '../IsPublic.decorator';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const result = super.canActivate(context);
    if (result instanceof Observable) {
      return result
        .pipe(
          map((value) => !!value),
          defaultIfEmpty(false),
        )
        .toPromise() as Promise<boolean>;
    }
    return result;
  }
}
