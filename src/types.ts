export type Thunk<T> = () => T;
export type Wrapped<T> = T | Thunk<T>;

export function unwrap<T>(val: Wrapped<T>): T {
  return typeof val === "function" ? (val as Thunk<T>)() : val;
}

export function fmap<T, K>(fn: (t0: T) => K): (t1: Wrapped<T>) => K {
  return (t1: Wrapped<T>) => {
    return fn(unwrap(t1));
  };
}

export type Density = (
  from: Wrapped<number>,
  to: Wrapped<number>,
) => Wrapped<number>;
