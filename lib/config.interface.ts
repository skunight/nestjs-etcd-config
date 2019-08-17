interface ConfigKey {
  key: string,
  alias: string,
}

export interface ConfigOptions {
  prifix?: string,
  url: string,
  keys: ConfigKey[]
}
