import { Injectable, Inject } from '@nestjs/common'
import { ETCD_CONFIGS } from './config.constants'
import { Observable } from 'rxjs'
import { EventEmitter } from 'events'
import { EtcdConfigInstance } from './config.interface';

@Injectable()
export class EtcdConfigService extends EventEmitter {
  constructor(
    @Inject(ETCD_CONFIGS)
    private readonly configInstance: EtcdConfigInstance,
  ) {
    super()
    this.configInstance.listener.subscribe((res) => {
      try {
        const newValue = JSON.parse(res.value)
        this.set(res.key, newValue)
        this.emit(res.key, newValue)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  get(name: string) {
    return this.configInstance.configs.get(name)
  }

  private set(name: string, val: any) {
    this.configInstance.configs.set(name, val)
  }
}
