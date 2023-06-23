import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token)
      throw new UnauthorizedException('Token not found , please log in first');

    try {
      // Verify and decode the token
      const decodedToken = verify(token, process.env.JWT_SECRET)

      // Attach the decoded token to the request object for later use
     request.user = decodedToken

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
