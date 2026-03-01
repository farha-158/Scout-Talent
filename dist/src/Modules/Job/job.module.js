"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("./job.entity");
const job_applicant_entity_1 = require("./job_applicant.entity");
const job_controller_1 = require("./job.controller");
const user_module_1 = require("../Users/user.module");
const jwt_1 = require("@nestjs/jwt");
const cv_module_1 = require("../CV/cv.module");
let JobModule = class JobModule {
};
exports.JobModule = JobModule;
exports.JobModule = JobModule = __decorate([
    (0, common_1.Module)({
        controllers: [job_controller_1.JobController],
        providers: [job_service_1.JobServices],
        imports: [
            user_module_1.UserModule,
            jwt_1.JwtModule,
            cv_module_1.CVModule,
            typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job, job_applicant_entity_1.JobApplicant])
        ],
        exports: [job_service_1.JobServices]
    })
], JobModule);
//# sourceMappingURL=job.module.js.map