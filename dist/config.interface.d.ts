import { Observable } from "rxjs";
import { Namespace } from "etcd3";
interface ConfigKey {
    key: string;
    alias: string;
}
export interface EtcdConfigInstance {
    configs: Map<string, any>;
    listener: Observable<any>;
    client: Namespace;
}
export interface ConfigOptions {
    prifix?: string;
    url: string;
    keys: ConfigKey[];
}
export {};
