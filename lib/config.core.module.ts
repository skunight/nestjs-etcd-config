import { Global, DynamicModule, Module } from '@nestjs/common'
import { EtcdModule} from 'nestjs-etcd3'
import { ConfigOptions } from './index'
import { EtcdConfigService } from './config.service'
import { createConfig } from './config.provider'
@Global()
@Module({
})
export class EtcdConfigCoreModule {
  static root(options: ConfigOptions): DynamicModule {
    return {
      imports: [
        EtcdModule.root({
          hosts: options.url,
        }),
      ],
      module: EtcdConfigCoreModule,
      providers: [
        EtcdConfigService,
        createConfig(options),
      ],
      exports: [
        EtcdConfigService,
      ],
    }
  }
}
