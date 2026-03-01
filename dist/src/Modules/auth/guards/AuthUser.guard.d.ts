import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../Users/user.service";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private config;
    private reflector;
    private userService;
    constructor(jwtService: JwtService, config: ConfigService, reflector: Reflector, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
