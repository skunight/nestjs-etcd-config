import { EventEmitter } from 'events';
export declare class EtcdConfigService extends EventEmitter {
    private readonly configs;
    constructor(configs: Map<string, any>);
    get(name: string): any;
}
