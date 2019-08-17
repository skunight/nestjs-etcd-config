import { DynamicModule } from '@nestjs/common';
import { ConfigOptions } from './';
export declare class EtcdConfigModule {
    static root(options: ConfigOptions): DynamicModule;
}
