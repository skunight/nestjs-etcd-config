import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './index';
export declare class EtcdConfigCoreModule {
    static root(options: ConfigOptions): DynamicModule;
}
