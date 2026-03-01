"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const user_module_1 = require("./Modules/Users/user.module");
const mail_module_1 = require("./Modules/Mail/mail.module");
const cv_module_1 = require("./Modules/CV/cv.module");
const job_module_1 = require("./Modules/Job/job.module");
const throttler_1 = require("@nestjs/throttler");
const skills_module_1 = require("./Modules/Skills/skills.module");
const experience_module_1 = require("./Modules/Experience/experience.module");
const auth_module_1 = require("./Modules/auth/auth.module");
const data_source_1 = require("../db/data_source");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            cv_module_1.CVModule,
            job_module_1.JobModule,
            skills_module_1.SkillModule,
            experience_module_1.ExperienceModule,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 10
                }
            ])
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map