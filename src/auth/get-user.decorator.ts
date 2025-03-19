import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {     
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);                                          