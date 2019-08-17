import { Provider } from '@nestjs/common'
import { EtcdService } from 'nestjs-etcd3'
import { ETCD_CONFIGS } from './config.constants'
import { ConfigOptions } from './'
import { merge, Observable } from 'rxjs'

export function createConfig(options: ConfigOptions): Provider {
  return {
    provide: ETCD_CONFIGS,
    useFactory: async (etcdService: EtcdService) => {
      const client = etcdService.getClient(options.prifix)
      const configs = new Map<string, any>()
      const observables = []
      for (const k of options.keys) {
        configs.set(k.alias, await client.get(k.key).json())
        observables.push(Observable.create(async (observer) => {
          const watchBuilder = await client.watch().key(k.key).create()
          watchBuilder.on('put', (res) => {
            observer.next({
              key: k.alias,
              value: res.value.toString(),
            })
          })
        }))
      }
      configs.set('listener', merge(...observables))
      return configs
    },
    inject: [EtcdService],
  }
}
