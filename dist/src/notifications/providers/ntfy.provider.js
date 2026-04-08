"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var NtfyProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NtfyProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const notification_provider_interface_1 = require("./notification-provider.interface");
let NtfyProvider = NtfyProvider_1 = class NtfyProvider extends notification_provider_interface_1.NotificationProvider {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(NtfyProvider_1.name);
        this.baseUrl = process.env.NTFY_URL ?? 'https://ntfy.sh';
    }
    async send(payload) {
        try {
            await axios_1.default.post(`${this.baseUrl}/${payload.topic}`, payload.message, {
                headers: {
                    'Content-Type': 'text/plain',
                    Title: payload.title,
                    Priority: String(payload.priority ?? 3),
                    Tags: (payload.tags ?? []).join(','),
                },
                timeout: 5000,
            });
        }
        catch (err) {
            this.logger.warn(`ntfy push failed [${payload.topic}]: ${err.message}`);
        }
    }
};
exports.NtfyProvider = NtfyProvider;
exports.NtfyProvider = NtfyProvider = NtfyProvider_1 = __decorate([
    (0, common_1.Injectable)()
], NtfyProvider);
//# sourceMappingURL=ntfy.provider.js.map