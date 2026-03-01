"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../../Users/user.service");
let AuthGuard = class AuthGuard {
    jwtService;
    config;
    reflector;
    userService;
    constructor(jwtService, config, reflector, userService) {
        this.jwtService = jwtService;
        this.config = config;
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(context) {
        const roles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
        if (!roles || roles.length === 0)
            throw new common_1.BadRequestException('no role provider');
        const request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (token && type === 'Bearer') {
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: this.config.get('JWT_Access_SECRET')
                });
                const user = await this.userService.findUser(payload.id);
                if (!user)
                    return false;
                if (roles.includes(user.role)) {
                    request['user'] = payload;
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new common_1.BadRequestException('invalid token' + err);
            }
        }
        else {
            throw new common_1.BadRequestException('no token provider');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        core_1.Reflector,
        user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=AuthUser.guard.js.map