"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVModule = void 0;
const common_1 = require("@nestjs/common");
const cv_controller_1 = require("./cv.controller");
const cv_service_1 = require("./cv.service");
const typeorm_1 = require("@nestjs/typeorm");
const cv_entity_1 = require("./cv.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const user_module_1 = require("../Users/user.module");
const jwt_1 = require("@nestjs/jwt");
let CVModule = class CVModule {
};
exports.CVModule = CVModule;
exports.CVModule = CVModule = __decorate([
    (0, common_1.Module)({
        controllers: [cv_controller_1.CVController],
        providers: [cv_service_1.CVService],
        imports: [
            user_module_1.UserModule,
            jwt_1.JwtModule,
            typeorm_1.TypeOrmModule.forFeature([cv_entity_1.CV]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './FileCV',
                    filename: (req, file, cb) => {
                        const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
                        const filename = `${prefix}-${file.originalname}`;
                        cb(null, filename);
                    }
                }),
                fileFilter: (req, file, cb) => {
                    if (file.mimetype !== 'application/pdf' ||
                        !file.originalname.match(/\.(pdf)$/)) {
                        return cb(new Error('Only PDF files are allowed'), false);
                    }
                    cb(null, true);
                },
                limits: {
                    fileSize: 2 * 1024 * 1024,
                },
            })
        ],
        exports: [cv_service_1.CVService]
    })
], CVModule);
//# sourceMappingURL=cv.module.js.map