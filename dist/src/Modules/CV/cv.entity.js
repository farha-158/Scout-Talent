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
exports.CV = void 0;
const typeorm_1 = require("typeorm");
const constant_1 = require("../../utils/Constant/constant");
const user_entity_1 = require("../Users/user.entity");
let CV = class CV {
    id;
    fileUrl;
    createdAt;
    applicant;
};
exports.CV = CV;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CV.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CV.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => constant_1.CURRENT_TIMESTAMP }),
    __metadata("design:type", Date)
], CV.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.Cvs),
    __metadata("design:type", user_entity_1.User)
], CV.prototype, "applicant", void 0);
exports.CV = CV = __decorate([
    (0, typeorm_1.Entity)({ name: 'CV' })
], CV);
//# sourceMappingURL=cv.entity.js.map