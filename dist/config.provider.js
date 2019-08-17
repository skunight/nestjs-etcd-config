"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_etcd3_1 = require("nestjs-etcd3");
const config_constants_1 = require("./config.constants");
const rxjs_1 = require("rxjs");
function createConfig(options) {
    return {
        provide: config_constants_1.ETCD_CONFIGS,
        useFactory: (etcdService) => __awaiter(this, void 0, void 0, function* () {
            const client = etcdService.getClient(options.prifix);
            const configs = new Map();
            const observables = [];
            for (const k of options.keys) {
                configs.set(k.alias, yield client.get(k.key).json());
                observables.push(rxjs_1.Observable.create((observer) => __awaiter(this, void 0, void 0, function* () {
                    const watchBuilder = yield client.watch().key(k.key).create();
                    watchBuilder.on('put', (res) => {
                        observer.next({
                            key: k.alias,
                            value: res.value.toString(),
                        });
                    });
                })));
            }
            return { configs, listener: rxjs_1.merge(...observables), client };
        }),
        inject: [nestjs_etcd3_1.EtcdService],
    };
}
exports.createConfig = createConfig;
