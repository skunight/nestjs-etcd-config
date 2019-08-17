"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EtcdConfigCoreModule_1;
const common_1 = require("@nestjs/common");
const nestjs_etcd3_1 = require("nestjs-etcd3");
const config_service_1 = require("./config.service");
const config_provider_1 = require("./config.provider");
let EtcdConfigCoreModule = EtcdConfigCoreModule_1 = class EtcdConfigCoreModule {
    static root(options) {
        return {
            imports: [
                nestjs_etcd3_1.EtcdModule.root({
                    hosts: options.url,
                }),
            ],
            module: EtcdConfigCoreModule_1,
            providers: [
                config_service_1.EtcdConfigService,
                config_provider_1.createConfig(options),
            ],
            exports: [
                config_service_1.EtcdConfigService,
            ],
        };
    }
};
EtcdConfigCoreModule = EtcdConfigCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], EtcdConfigCoreModule);
exports.EtcdConfigCoreModule = EtcdConfigCoreModule;
