import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import { JWT_HEADER_PARAM, verifyJWT } from '../shared/utils';

@Injectable()
export class JWTGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        return true;
    }
}
