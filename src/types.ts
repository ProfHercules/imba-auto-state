export type ProxyKey = string | symbol;

export type OnChangeFn<T> = (target: T, key: ProxyKey, value: any) => void;
