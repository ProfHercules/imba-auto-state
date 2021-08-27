import type { OnChangeFn, ProxyKey } from "./types";

const handleWith = <T extends object>(
  onChange: OnChangeFn<T>
): ProxyHandler<T> => {
  return {
    set: (target: T, key: ProxyKey, value: any) => {
      try {
        Reflect.set(target, key, value);
        onChange(target, key, value);
      } catch {
        return false;
      }
      return true;
    },
    get: (target: T, key: ProxyKey) => {
      if (key == "isProxy") return true;

      const prop = target[key];

      if (typeof prop == "undefined") return;

      const propDesc = Object.getOwnPropertyDescriptor(target, key);

      // we're dealing with something we can't wrap in a Proxy; skip it
      if (propDesc.set === undefined) return target[key];

      if (!prop.isProxy && typeof prop === "object")
        target[key] = new Proxy(prop, handleWith<T>(onChange));

      return target[key];
    },
  };
};

export const createAutoState = <T extends object>(
  state: T,
  onChange: OnChangeFn<T>
): T => new Proxy<T>(state, handleWith<T>(onChange));
