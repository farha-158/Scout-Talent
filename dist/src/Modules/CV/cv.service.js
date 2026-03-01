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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cv_entity_1 = require("./cv.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../Users/user.service");
let CVService = class CVService {
    cvRepository;
    userService;
    constructor(cvRepository, userService) {
        this.cvRepository = cvRepository;
        this.userService = userService;
    }
    async uploadCV(userId, fileUrl) {
        const user = await this.userService.findUser(userId);
        if (!user)
            throw new common_1.BadRequestException('user not found');
        const cv = this.cvRepository.create({ fileUrl, applicant: user });
        await this.cvRepository.save(cv);
        return { message: "cv upload successful", cvId: cv.id };
    }
    async findCV(id) {
        const cv = await this.cvRepository.findOne({ where: { id } });
        return cv;
    }
};
exports.CVService = CVService;
exports.CVService = CVService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cv_entity_1.CV)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], CVService);
//# sourceMappingURL=cv.service.js.map