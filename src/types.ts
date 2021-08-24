export type ProxySetFn = (
  target: object,
  key: string | symbol,
  value: any
) => void;
