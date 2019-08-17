import { Module, DynamicModule } from '@nestjs/common'
import { ConfigOptions } from './'
import { EtcdConfigCoreModule } from './config.core.module'

@Module({})
export class EtcdConfigModule {
  static root(
    options: ConfigOptions,
  ): DynamicModule {
    return {
      module: EtcdConfigModule,
      imports: [EtcdConfigCoreModule.root(options)],
    }
  }
}
