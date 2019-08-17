import { Injectable, Inject } from '@nestjs/common'
import { ETCD_CONFIGS } from './config.constants'
import { Observable } from 'rxjs'
import { EventEmitter } from 'events'

@Injectable()
export class EtcdConfigService extends EventEmitter {
  constructor(
    @Inject(ETCD_CONFIGS)
    private readonly configs: Map<string, any>,
  ) {
    super()
    const observable = this.configs.get('listener') as Observable<any>
    observable.subscribe((res) => {
      try {
        this.emit(res.key, JSON.parse(res.value))
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  get(name: string) {
    return this.configs.get(name)
  }
}
