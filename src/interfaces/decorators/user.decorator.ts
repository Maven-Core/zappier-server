import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
