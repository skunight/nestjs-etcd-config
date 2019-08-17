import { EventEmitter } from 'events';
import { EtcdConfigInstance } from './config.interface';
export declare class EtcdConfigService extends EventEmitter {
    private readonly configInstance;
    constructor(configInstance: EtcdConfigInstance);
    get(name: string): any;
    private set;
}
