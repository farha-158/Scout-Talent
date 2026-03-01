"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const common_1 = require("@nestjs/common");
exports.currentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    return user;
});
//# sourceMappingURL=currentUser.decorator.js.map