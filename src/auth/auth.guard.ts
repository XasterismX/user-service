import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {request, Request} from "express";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly cfg: ConfigService) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    try {
      const verify = await this.jwtService.verifyAsync(token, {
        secret: this.cfg.get('JWT_SECRET'),
      });
      console.log(verify);
      request["user"] = verify;
      
    }catch (e) {
      throw new UnauthorizedException(e);
    }
    return true;

  }
  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? type : undefined;

  }
}
