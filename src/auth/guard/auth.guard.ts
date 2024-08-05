import { CanActivate, ConflictException, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  
  async canActivate(context: ExecutionContext,):Promise<boolean>{
    
    const request = context.switchToHttp().getRequest();
    const token = this.extraTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized: No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid or expired token');
    }

    return true;
  }

  private extraTokenFromHeader(request : Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer'? token : undefined;
  }
}
