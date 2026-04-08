"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./config/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const activities_module_1 = require("./activities/activities.module");
const resources_module_1 = require("./resources/resources.module");
const bookings_module_1 = require("./bookings/bookings.module");
const notifications_module_1 = require("./notifications/notifications.module");
const websocket_module_1 = require("./websocket/websocket.module");
const staff_module_1 = require("./staff/staff.module");
const admin_module_1 = require("./admin/admin.module");
const pricing_module_1 = require("./pricing/pricing.module");
const redis_module_1 = require("./common/redis/redis.module");
const wallet_module_1 = require("./wallet/wallet.module");
const reports_module_1 = require("./reports/reports.module");
const payments_module_1 = require("./payments/payments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            redis_module_1.RedisModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            activities_module_1.ActivitiesModule,
            resources_module_1.ResourcesModule,
            bookings_module_1.BookingsModule,
            notifications_module_1.NotificationsModule,
            websocket_module_1.WebsocketModule,
            staff_module_1.StaffModule,
            admin_module_1.AdminModule,
            pricing_module_1.PricingModule,
            wallet_module_1.WalletModule,
            reports_module_1.ReportsModule,
            payments_module_1.PaymentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map