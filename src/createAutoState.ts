import type { ProxySetFn } from "./types";

export const createAutoState = <T extends object>(
  state: T,
  updatePending?: ProxySetFn,
  updateComplete?: ProxySetFn
): T =>
  new Proxy<T>(state, {
    set: (target: object, key: string | symbol, value: any) => {
      if (!imba || !imba.commit) throw Error("Imba is undefined");
      updatePending && updatePending(target, key, value);
      Reflect.set(target, key, value);
      imba
        .commit()
        .then((_) => updateComplete && updateComplete(target, key, value));
      return true;
    },
  });
